import {
	parse as vueParse,
	compileTemplate,
	compileScript,
} from "@vue/compiler-sfc";
import path from "path";
import fs from "fs";
import {
	Project,
	VariableDeclaration,
	CallExpression,
	Identifier,
	ObjectLiteralExpression,
} from "ts-morph";
import { BasePack, EntryFile, MojitoCompilerConfig } from "./conf";

type ExportComponent = {export:string, name:string, category?:string, cover?:string}

const TempDir = "node_modules/@mojito/__pack"

export function getPathFiles(entry: string, extname?: string) {
	const files: {
		filename: string;
		extname: string;
		basename: string;
		source: string | Buffer;
	}[] = [];
	const stat = fs.lstatSync(entry);
	if (stat.isDirectory()) {
		const paths = fs.readdirSync(entry);
		paths.forEach((p) => {
			const rels = getPathFiles(path.resolve(entry, p), extname);
			files.push(...rels);
		});
	} else {
		if (!extname || path.extname(entry) === extname) {
			files.push({
				filename: entry,
				extname: path.extname(entry),
				basename: path.basename(entry),
				source: fs.readFileSync(entry),
			});
		}
	}
	return files;
}

export function parseVue(filepath: string) {

	const buildpath = path.resolve(process.cwd(), TempDir);
	const files = getPathFiles(filepath, ".vue");

	if (fs.existsSync(buildpath)) {
		fs.rmSync(buildpath, { recursive: true });
	}
	fs.mkdirSync(buildpath, { recursive: true });

	files.forEach((v) => {
		const { descriptor, errors } = vueParse(v.source.toString(), {
			filename: v.filename,
			sourceMap: false,
		});

    if(errors && errors.length){
      throw errors;
  }

		if (descriptor.script) {
			const relativePath = path.relative(filepath, v.filename);
			const buildFilename = path.resolve(buildpath, relativePath);
			const buildPathname = path.dirname(buildFilename);
			if (!fs.existsSync(buildPathname)) {
				fs.mkdirSync(buildPathname, { recursive: true });
			}
			fs.writeFileSync(`${buildFilename}.ts`, descriptor.script.content);
		}
	});

	return parseTs(`${buildpath}/**/*.ts`, filepath);
}

export function parseTs(tsEntry: string, enptyPath:string) {
	const parseAST = (entryFile: string | string[]) => {
		// 解析入口文件AST
		const project = new Project({
			compilerOptions: {
				tsConfigFilePath: path.resolve(process.cwd(), "./tsconfig.json"),
				skipAddingFilesFromTsConfig: true,
				skipFileDependencyResolution: true,
			},
		});
		const sourceFiles = project.addSourceFilesAtPaths(entryFile);
		const components: Record<string, Record<string, any>>[] = [];

		sourceFiles.forEach((sourceFile) => {
			const filePath = sourceFile.getFilePath();
			const fileExports: Record<string, any> = { [filePath]: {} };
			// 获取所有导出
			const expos = sourceFile.getExportedDeclarations();
			expos.forEach((value, exportName) => {
				value.forEach((decla) => {
					let pack: any = undefined;
					const kindName = decla.getKindName();
					if (kindName === "VariableDeclaration") {
						// 解释 export const pack = CreatePack(...)
						const variab = decla as VariableDeclaration;
						// 获取变量的初始化方式
						const initer = variab.getInitializer();
						if (initer && initer.getKindName() === "CallExpression") {
							pack = parseCreatePack(initer as CallExpression);
						}
					} else if (kindName === "CallExpression") {
						// 解释 export default CreatePack(...)
						pack = parseCreatePack(decla as CallExpression);
					}
					if (pack) {
						fileExports[filePath][exportName] = pack;
					}
				});
			});

			if (Object.keys(fileExports[filePath]).length > 0) {
				// return fileExports;
				components.push(fileExports);
			}
		});
		return components;
	};

	/**
	 * 解释源码中的createPack的定义
	 * @param callExpression
	 * @returns
	 */
	const parseCreatePack = (
		callExpression: CallExpression
	): Record<string, string> | undefined => {
		// 获取返回类型
		const returnType = callExpression.getReturnType();
		// const returnPropertys = returnType
		// 	.getProperties()
		// 	.map((property) => property.getName());
		const returnPropertys = returnType.getText();
		if (
			returnPropertys.includes("__root") &&
			returnPropertys.includes("__ref") &&
			returnPropertys.includes("__props") &&
			returnPropertys.includes("__component") &&
			returnPropertys.includes("__info") &&
			returnPropertys.includes("component") &&
			returnPropertys.includes("componentInfo") &&
			returnPropertys.includes("mount") &&
			returnPropertys.includes("unmount") &&
			returnPropertys.includes("setProps") &&
			returnPropertys.includes("getProps")
		) {
			// 确定是createPack调用， 获取createPack的两个参数
			const [arg1, arg2] = callExpression.getArguments();
			if (arg1 && arg2) {
				// 组件名称
				const component = (arg1 as Identifier).getText();
				// 组件props
				// const props = arg2 as ObjectLiteralExpression;
				// 保存组件信息
				const componentInfo: Record<string, string> = { component };
				// 第二个参数是对象，获取对象里的字段和值
				// const variables =
				// 	props.getProperties() as unknown as VariableDeclaration[];
				// variables.forEach((val) => {
				// 	const value = val.getInitializer()?.getText();
				// 	if(value){
				// 		componentInfo[val.getName()] = value;
				// 	}
				// });
				// if (componentInfo.props) {
				// 	componentInfo.props = componentInfo.props
				// 		.replace(/\s/g, "")
				// 		.replace("'", '"');
				// }
				// if (componentInfo.name) {
				// 	// 名称不能为空
				// 	componentInfo.name = componentInfo.name.replace(/['"]/g, "");
				// 	return componentInfo;
				// }
				componentInfo.name = component.toString()
				return componentInfo;
			}
		}
	};

	return parseAST(tsEntry);
}

export function parseEntry(entry:string, filepath:string, basePack?:BasePack){
  if(basePack === BasePack.vue){
    return parseVue(filepath);
  }else if(basePack === BasePack.react){
    return parseTs(entry, filepath)
  }else{
    throw new Error(`Cannot be identified ${entry}`)
  }
}


/**
 * 生成入口文件
 * @param allComponents
 * @param entryPath 入口文件路径
 * @param isHot 是否为热更新
 */
 export function createEntry({entry}: MojitoCompilerConfig, opts:{basePack?:BasePack, isHot?:boolean}) {

	const {basePack, isHot} = opts;

  const parsePath = entry.substring(0, entry.indexOf("*"));
	const entpryPath = path.resolve(process.cwd(), parsePath);

	const allComponents = parseEntry(entry, entpryPath, basePack);
	if(!allComponents || allComponents.length === 0) return [];

	let exportArr:any[] = [];	
	const filterImports:string[] = [];

	const exportComponents:ExportComponent[] = [];

	allComponents.forEach((component) => {
		for (let filePath in component) {
      const componentInfo = component[filePath];

      let importFile = ""
			if(filePath.includes(TempDir)){
					filePath = filePath.substring(filePath.indexOf(TempDir) + TempDir.length);
					importFile = path.relative(process.cwd(), `${entpryPath}/${filePath}`);
			}else{
					importFile = path.relative(process.cwd(), filePath);
			}

			importFile = importFile
				.substring(0, importFile.lastIndexOf("."))
				.replace(/\\/g, "/");
			for (const exportName in componentInfo) {
				let variable = "";
				if (exportName === "default") {
					// 使用文件名作为导出
					const sp = importFile.split("/");
					const lastName = sp[sp.length - 1]
					let defaultName = lastName.includes(".") ? lastName.substring(0,lastName.indexOf(".")) : lastName;
					if (defaultName === "index") {
							// 使用最后一层目录
							defaultName = sp[sp.length - 2] || "Component";
					}
					variable = defaultName;
				} else {
					variable = exportName;
				}

				const {name, category, cover} = componentInfo[exportName];
				exportComponents.push({export: variable, name, category, cover});

				// 生成 export const BarChart = async ()=> (await import("./src/components/BarChart")).default;
				const exportText = `export const ${variable} = async ()=> (await import("./${importFile}")).${exportName};`;
				if (!isHot) {
					exportArr.push(exportText);
				}else{
					// watch模式下重新编译修过的文件
					if(!filterImports.includes(importFile)){
						exportArr = exportArr.filter(text => !text.includes(importFile));
						filterImports.push(importFile)
					}
					exportArr.push(exportText);
				}
			}
		}
	});
	fs.writeFileSync(EntryFile, exportArr.join("\n"));

	return exportComponents;
}


/**
 * 解释externals参数，获取依赖
 * @param configExternals
 * @returns
 */
 export function parseExternals(configExternals: any) {
	const externals: Record<string, string> = {};
	const cdn: Record<string, string> = {};
	const confExternals: any = configExternals;
	if (Array.isArray(confExternals)) {
		throw new Error(
			"请配置正确的externals, 格式：{ react: [react cdn, 'react'], lodash: [lodash cdn, '_'] ...}"
		);
	} else if (typeof confExternals === "object") {
		for (const key in confExternals) {
			if (!Array.isArray(confExternals[key]) || confExternals[key].length < 1) {
				throw new Error(
					"请配置正确的externals, 格式：{ react: [react cdn], lodash: [lodash cdn, '_'] ...}"
				);
			}
			externals[key] = confExternals[key][1] || key;
			cdn[externals[key]] = confExternals[key][0];
		}
	}
	return { externals, cdn };
}
