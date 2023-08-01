import webpack, { Compilation } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "./webpackConfig";
import path from "path";
import fs from "fs";
import { JSDOM } from "jsdom"
import "systemjs"
import { createEntry, parseExternals } from "./parser";
import { BasePack, EntryFile, MojitoCompilerConfig } from "./conf";
import { createOutFs, createServer, getComponentInfo } from "./server";

const pkg = require(`${process.cwd()}/package.json`);
pkg.name = pkg.name.replace(/[\\\/]/g, "-");

function checkBase() {
	const { dependencies, devDependencies } = pkg;
	const allDep = { ...dependencies, ...devDependencies };
	if (allDep["@mojito/vue-pack"]) {
		return BasePack.vue;
	} else if (allDep["@mojito/react-pack"]) {
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
 * @param callback
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

		createServer(config.output!.path!, config.output!.publicPath as string, ()=>{
			getComponentInfo(pkg.name, pkg.version, externalInfo?.cdn)
		});
		

		// const file = fs.readFileSync(`${conf!.output!.path}/${pkg.name}.js`).toString();
		// fs.writeFileSync(`${conf!.output!.path}/${pkg.name}.js`, `
		// var self = {}
		// var jsdom = require("jsdom");
		// var { JSDOM } = jsdom;
		// const { document } = new JSDOM("<!DOCTYPE html><p>Hello world</p>").window;
		// ${file}`)

			

	// 	let importMaps = {...externalInfo?.cdn}
	// 	const run = `
	// 	<html>
	// 	<head>
	// 		<script src="file://E:/project/drinkjs/mojito-compack/packages/compiler/node_modules/systemjs/dist/system.min.js"></script>
	// 		<script>
	// 			System.addImportMap({
	// 				imports: ${JSON.stringify(importMaps)},
	// 			});
	// 			window.mojito = {}
	// 			async function load(){
	// 				const components = await System.import("http://127.0.0.1:3838/public/mojito-echarts@1.0.1/mojito-echarts.js");
	// 				for (const key in components) {
	// 					if (key !== "__esModule" && typeof components[key]) {
	// 						const comp = await components[key]();
	// 						console.log("============================", comp);
	// 						window.mojito[key] = new comp
	// 					}
	// 				}
	// 			}
	// 			load()
	// 		</script>
	// 	</head>
	// 	<body>
	// 	<script>document.body.appendChild(document.createElement("hr"));</script>
	// 	</body>
	// 	</html>
	// `
	// 	console.log(run)

		// const { window } = new JSDOM(run, { runScripts: "dangerously", resources: "usable", url: `http://127.0.0.1:3838` });
		// setTimeout(()=>{
		// 	console.log(window.mojito)
		// 	for(const key in window.mojito){
		// 		console.log(window.mojito[key].__info)
		// 	}
		// }, 5000)



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

				console.log('\x1b[32m%s\x1b[0m', "Build complete")
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
