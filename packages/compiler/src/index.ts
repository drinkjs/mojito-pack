import webpack, { Compilation } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "./webpackConfig";
import path from "path";
import fs from "fs";
import "systemjs"
import { createEntry, ExportComponent, parseExternals } from "./parser";
import { BasePack, EntryFile, MojitoCompilerConfig } from "./conf";
import { createOutFs, createServer, getComponentInfo, outputBuild } from "./server";

const pkg = require(`${process.cwd()}/package.json`);
pkg.name = pkg.name.replace(/[\\\/]/g, "-");

function checkBase() {
	const { dependencies, devDependencies } = pkg;
	const allDep = { ...dependencies, ...devDependencies };
	if (allDep["@drinkjs/mojito-vue-pack"]) {
		return BasePack.vue;
	} else if (allDep["@drinkjs/mojito-react-pack"]) {
		return BasePack.react;
	}
}

/**
 * 创建webpack compiler
 * @param config
 * @param isDev
 * @returns
 */
function createCompiler(config: MojitoCompilerConfig, isDev?: boolean) {
	const basePack = checkBase();
	const externalInfo = config.externals
		? parseExternals(config.externals)
		: undefined;

	if (externalInfo) {
		config.externals = externalInfo.externals;
	}

	const exportComponents = createEntry(config, { basePack });
	config = webpackConfig(config, pkg, { isDev, basePack });
	config.entry = EntryFile;

	delete config.template;
	const compiler = webpack(config);
	compiler.outputFileSystem = createOutFs()

	return { compiler, conf: config, exportComponents, externalInfo };
}

/**
 * 发布生产包
 * @param config
 */
export function production(config: MojitoCompilerConfig) {
	const { compiler, conf, exportComponents, externalInfo } =
		createCompiler(config);

	compiler.run(async (err, stats) => {
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
				console.log("Build complete")
			} else {
				console.error(closeErr);
				process.exit(1)
			}
		});

		createServer(config.output!.path!, config.output!.publicPath as string, async ()=>{
			const components = await getComponentInfo(pkg.name, pkg.version, externalInfo?.cdn) as Array<any>;
			if (components.length === 0) {
				throw new Error("No components are available");
			}
			const infos:ExportComponent[] = []
			for(const key in components){
        if(components[key].__info){
					const {name, category, cover} = components[key].__info;
          console.log(`\x1b[34m\u{1F680}\u{1F680}\u{1F680} ${components[key].__info.name}`);
					infos.push({
						exportName: key,
						name,
						category,
						cover
					})
        }
      }

			outputBuild(config.output!.path!)

			fs.writeFileSync(
				`${conf!.output!.path}/mojito-pack.json`,
				JSON.stringify({
					name: pkg.name,
					version: pkg.version,
					external: externalInfo?.cdn,
					components: infos,
				})
			);
			process.exit(0)
		});
	});
}

/**
 * 启动WebpackDevServer
 * @param config
 */
export function devServer(config: MojitoCompilerConfig) {
	const { compiler, conf, externalInfo } = createCompiler(config, true);
	// 读取模版内容, 并替换importMap和import file内容
	let template = fs
		.readFileSync(config.template ?? path.resolve(__dirname, "./template.html"))
		.toString();
	if (externalInfo) {
		template = template.replace(
			"{/* IMPORT_MAP */}",
			JSON.stringify(externalInfo.cdn)
		);
	}
	template = template.replace("IMPORT_FILE", conf.output?.filename as string).replace("PkgName", pkg.name).replace("PkgVersion", pkg.version);
	fs.writeFileSync(path.resolve(__dirname, "./index.html"), template);

	// compiler.hooks.watchRun.tap("WatchRun", (comp) => {
	// 	if (comp.modifiedFiles) {
	// 		// 监听修改的文件重新编译
	// 		const changedFiles = Array.from(comp.modifiedFiles,(file) => file);
	// 		const components = parseEntry(changedFiles);
	// 		createEntry(components, conf.entry as string, true)
	// 	}
	// });
	const devServerOptions = conf.devServer;
	const server = new WebpackDevServer(devServerOptions, compiler);
	const runServer = async () => {
		console.log("Starting server...");
		await server.start();
	};
	runServer();
}
