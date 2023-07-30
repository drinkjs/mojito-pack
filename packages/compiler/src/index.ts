import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "./webpackConfig";
import path from "path";
import fs from "fs";
import { createEntry, parseExternals } from "./parser";
import { BasePack, EntryFile, MojitoCompilerConfig } from "./conf";

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

	return { compiler, conf: config, exportComponents, externalInfo };
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
export function production(config: MojitoCompilerConfig) {
	const { compiler, conf, exportComponents, externalInfo } =
		createCompiler(config);

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
	template = template.replace("IMPORT_FILE", conf.output?.filename as string);
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
