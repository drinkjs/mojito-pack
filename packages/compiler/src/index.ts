import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "./webpackConfig";
import path from "path";
import fs from "fs";
// import { rimrafSync } from "rimraf";
import {
	CallExpression,
	Identifier,
	ObjectLiteralExpression,
	Project,
	VariableDeclaration,
} from "ts-morph";

const pkg = require(`${process.cwd()}/package.json`);
pkg.name = pkg.name.replace(/[\\\/]/g, "-");

type ExportComponent = {export:string, name:string}
/**
 * 解释externals参数，获取依赖
 * @param configExternals
 * @returns
 */
function parseExternals(configExternals: any) {
	const externals: Record<string, string> = {};
	const cdn: Record<string, string> = {};
	const confExternals: any = configExternals;
	if (Array.isArray(confExternals)) {
		throw new Error(
			"请配置正确的externals, 格式：{ react: [react cdn, 'react'], lodash: [lodash cdn, '_'] ...}"
		);
	} else if (typeof confExternals === "object") {
		for (const key in confExternals) {
			if (!Array.isArray(confExternals[key]) || confExternals[key].length < 2) {
				throw new Error(
					"请配置正确的externals, 格式：{ react: [react cdn, 'react'], lodash: [lodash cdn, '_'] ...}"
				);
			}
			externals[key] = confExternals[key][1];
			cdn[key] = confExternals[key][0];
		}
	}
	return { externals, cdn };
}

/**
 * 解释所有入口文件源码，得到所有CreatePack组件信息
 * @param entry
 * @returns
 */
function parseEntry(entry: string | string[]) {
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
		const components: any[] = [];

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
		const returnPropertys = returnType
			.getProperties()
			.map((property) => property.getName());

		if (
			returnPropertys.includes("componentInfo") &&
			returnPropertys.includes("mount") &&
			returnPropertys.includes("unmount") &&
			returnPropertys.includes("component") &&
			returnPropertys.includes("getId") &&
			returnPropertys.includes("setProps") &&
			returnPropertys.includes("getProps")
		) {
			// 确定是createPack调用， 获取createPack的两个参数
			const [arg1, arg2] = callExpression.getArguments();
			if (arg1 && arg2) {
				// 组件名称
				const component = (arg1 as Identifier).getText();
				// 组件props
				const props = arg2 as ObjectLiteralExpression;
				// 保存组件信息
				const componentInfo: Record<string, string> = { component };
				// 第二个参数是对象，获取对象里的字段和值
				const variables =
					props.getProperties() as unknown as VariableDeclaration[];
				variables.forEach((val) => {
					componentInfo[val.getName()] = val.getInitializerOrThrow().getText();
				});
				if (componentInfo.props) {
					componentInfo.props = componentInfo.props
						.replace(/\s/g, "")
						.replace("'", '"');
				}
				if (componentInfo.name) {
					// 名称不能为空
					componentInfo.name = componentInfo.name.replace(/['"]/g, "");
					return componentInfo;
				}
			}
		}
	};

	const rel = parseAST(entry);
	return rel;
}

/**
 * 创建webpack compiler
 * @param config
 * @param isDev
 * @returns
 */
function createCompiler(config: webpack.Configuration, isDev?: boolean) {
	const allComponents = parseEntry(config.entry as any);
	const externalInfo = config.externals
		? parseExternals(config.externals)
		: undefined;

	if (externalInfo) {
		config.externals = externalInfo.externals;
	}

	const conf = webpackConfig(config, pkg, isDev);
	conf.entry = `./entry.ts`;
	const exportComponents = createEntry(allComponents, conf.entry, true);
	const compiler = webpack(conf);
	// 构建memfs文件系统
	// const vol = new VolCls();
	// pathTree(vol, [process.cwd()]);
	// compiler.inputFileSystem = vol;

	return { compiler, conf, exportComponents, externalInfo };
}

/**
 * 生成入口文件
 * @param allComponents
 */
function createEntry(allComponents: any[], entryPath: string, init?: boolean) {
	if(!allComponents || allComponents.length === 0) return [];

	const memEntry = !init && fs.existsSync(entryPath) ? fs.readFileSync(entryPath).toString() : ""
	let exportArr = init ? [] : memEntry.split("\n");	
	const filterImports:string[] = [];

	const exportComponents:ExportComponent[] = [];

	allComponents.forEach((component) => {
		for (const filePath in component) {
			let importFile = path.relative(process.cwd(), filePath);
			importFile = importFile
				.substring(0, importFile.lastIndexOf("."))
				.replace(/\\/g, "/");
			const componentInfo = component[filePath];
			for (const exportName in componentInfo) {
				let variable = "";
				if (exportName === "default") {
					// 使用文件名作为导出
					const defaultName = importFile.substring(
						importFile.lastIndexOf("/") + 1
					);
					variable = defaultName;
				} else {
					variable = exportName;
				}

				exportComponents.push({export: variable, name: componentInfo[exportName].name})

				// export const BarChart = async ()=> (await import("./src/components/BarChart")).default;
				const exportText = `export const ${variable} = async ()=> (await import("./${importFile}")).${exportName};`;
				if (init) {
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
	fs.writeFileSync(entryPath, exportArr.join("\n"));

	return exportComponents;
}

/**
 * 把真实文件系统转换到memfs系统
 * @param vol
 * @param rootPaths
 * @param parent
 */
// function pathTree(vol: Volume, rootPaths: string[], parent?: string) {
// 	rootPaths.forEach((rootPath) => {
// 		const absPath = parent ? path.resolve(parent, rootPath) : rootPath;
// 		const stat = fs.lstatSync(absPath);
// 		if (!parent || stat.isDirectory()) {
// 			// 创建memfs目录
// 			const paths = fs.readdirSync(absPath);
// 			if (!vol.existsSync(absPath)) {
// 				vol.mkdirSync(absPath, { recursive: true });
// 			}
// 			pathTree(vol, paths, absPath);
// 		} else if (stat.isFile()) {
// 			// 创建memfs文件
// 			const filePath = path.dirname(absPath);
// 			if (!vol.existsSync(filePath)) {
// 				vol.mkdirSync(filePath, { recursive: true });
// 			}
// 			vol.writeFileSync(absPath, fs.readFileSync(absPath).toString());
// 		} else if (stat.isSymbolicLink()) {
// 			// 创建memfs快捷方式
// 			const linkPath = fs.readlinkSync(absPath);
// 			const paths = fs.readdirSync(linkPath);
// 			pathTree(vol, paths, linkPath);
// 			vol.symlinkSync(linkPath, absPath);
// 		}
// 	});
// }

/**
 * 发布生产包
 * @param config
 * @param callback
 */
export function production(
	config: webpack.Configuration,
) {
	const { compiler, conf, exportComponents, externalInfo } = createCompiler(config);

	compiler.run((err, stats) => {
		if (err || stats?.hasErrors()) {
			console.error(
				"\x1b[43m%s\x1b[0m",
				"Error:",
				err?.message || stats?.compilation.errors
			);
			process.exit(1);
		}

		compiler.close((closeErr) => {
			if (!closeErr) {
				if (exportComponents.length === 0) {
					throw new Error("No Export Components");
				}
		
				fs.writeFileSync(
					`${conf!.output!.path}/mojito-pack.json`,
					JSON.stringify({
						name: pkg.name,
						version: pkg.version,
						external: externalInfo?.cdn,
						components: exportComponents,
					})
				);

			} else {
				console.error(closeErr);
			}
		});
	});
}

/**
 * 启动WebpackDevServer
 * @param config
 */
export function devServer(config: webpack.Configuration) {
	const { compiler, conf, externalInfo } = createCompiler(config, true);
	// 读取模版内容, 并替换importMap和import file内容
	let template = fs.readFileSync(path.resolve(__dirname, "./template.html")).toString()
	if(externalInfo){
		template = template.replace("{/* IMPORT_MAP */}", JSON.stringify(externalInfo.cdn));
	}
	template = template.replace("IMPORT_FILE", conf.output?.filename as string);
	fs.writeFileSync(path.resolve(__dirname, "./index.html"), template);
	

	// compiler.plugin("compilation", compilation => {
	// 	compilation.contextDependencies.push(path.resolve(__dirname, "path/to/directory"));
	// })
	compiler.hooks.watchRun.tap("WatchRun", (comp) => {
		if (comp.modifiedFiles) {
			// 监听修改的文件重新编译
			const changedFiles = Array.from(comp.modifiedFiles,(file) => file);
			const components = parseEntry(changedFiles);
			createEntry(components, conf.entry as string)
		}
	});
	const devServerOptions = conf.devServer;
	const server = new WebpackDevServer(devServerOptions, compiler);
	const runServer = async () => {
		console.log("Starting server...");
		await server.start();
	};
	runServer();
}
