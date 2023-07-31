'use strict';

var yargs = require('yargs');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackMerge = require('webpack-merge');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var vueLoader = require('vue-loader');
var esbuildLoader = require('esbuild-loader');
var fs = require('fs');
var compilerSfc = require('@vue/compiler-sfc');
var tsMorph = require('ts-morph');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const EntryFile = "./mojito_entry.ts";
var BasePack;
(function (BasePack) {
    BasePack["vue"] = "vue";
    BasePack["react"] = "react";
})(BasePack || (BasePack = {}));

const progress = new webpack.ProgressPlugin();
const cwd = process.cwd();
function loaderPath(loader) {
    return path.resolve(__dirname, `../node_modules/${loader}`);
}
var webpackConfig = (config, pkg, { isDev, basePack }) => {
    var _a, _b;
    const { entry } = config;
    if (!config.output) {
        config.output = {};
    }
    const outPath = config.output.path
        ? `${cwd}/${config.output.path}/${pkg.name}@${pkg.version}`
        : `${cwd}/dist/${pkg.name}@${pkg.version}`;
    config.output.path = outPath;
    const plugins = [];
    if (isDev) {
        plugins.push(new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./index.html"),
            inject: false,
        }));
    }
    else {
        plugins.push(progress);
    }
    if (basePack === BasePack.vue) {
        plugins.push(new vueLoader.VueLoaderPlugin());
    }
    const getCssLoaders = (isModule, ...loaders) => {
        return [
            {
                loader: loaderPath("mojito-vue-style-loader"),
                // loader: "E:/project/drinkjs/mojito-vue-style-loader/index.js",
                options: {
                    pkg,
                }
            },
            {
                loader: loaderPath("css-loader"),
                options: { importLoaders: 1, modules: isModule },
            },
            {
                loader: loaderPath("postcss-loader")
            },
            ...loaders
        ];
    };
    const baseConfig = {
        entry,
        mode: isDev ? "development" : "production",
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".json", ".vue"],
        },
        externalsType: "system",
        output: {
            clean: true,
            libraryTarget: "system",
            crossOriginLoading: "anonymous",
            publicPath: isDev
                ? ""
                : `${config.output.publicPath || "/public"}/${pkg.name}@${pkg.version}/`,
            filename: `${pkg.name}.js`,
            chunkFilename: `${pkg.name}.[name].js`,
        },
        watchOptions: {
            aggregateTimeout: 800,
        },
        plugins,
        optimization: {
            minimizer: [
                // Use esbuild to minify
                new esbuildLoader.EsbuildPlugin(),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: loaderPath("vue-loader"),
                            options: { hotReload: false },
                        },
                    ],
                },
                {
                    test: /.[jt]sx?$/,
                    use: [
                        // {
                        // 	loader: path.resolve(__dirname, "../node_modules/ts-loader"),
                        // 	options: { appendTsSuffixTo: [/\.vue$/] },
                        // },
                        {
                            loader: loaderPath("esbuild-loader"),
                            options: {
                                // JavaScript version to compile to
                                target: "es2015",
                                loader: basePack === BasePack.vue ? "ts" : undefined,
                            },
                        },
                    ],
                    // exclude: /node_modules/,
                },
                {
                    test: /\.(png|jpg|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                    use: [
                        {
                            loader: loaderPath("url-loader"),
                            options: {
                                limit: 8192,
                                publicPath: "",
                                name: "[name][hash].[ext]",
                                esModule: false,
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/i,
                    exclude: /\.module\.css$/i,
                    use: getCssLoaders(false)
                },
                {
                    test: /\.module\.css$/i,
                    use: getCssLoaders(true),
                },
                {
                    test: /\.less$/i,
                    exclude: /\.module\.less$/i,
                    use: getCssLoaders(false, "less-loader")
                },
                {
                    test: /\.module\.less$/i,
                    use: getCssLoaders(true, "less-loader"),
                },
                {
                    test: /\.scss$/i,
                    exclude: /\.module\.scss$/i,
                    use: getCssLoaders(false, "sass-loader")
                },
                {
                    test: /\.module\.scss$/i,
                    use: getCssLoaders(true, "sass-loader"),
                },
            ],
        },
    };
    const mergedConfig = webpackMerge.merge(config, baseConfig);
    delete mergedConfig.entry.polyfills;
    delete mergedConfig.entry.styles;
    (_a = mergedConfig.optimization) === null || _a === void 0 ? true : delete _a.runtimeChunk;
    (_b = mergedConfig.optimization) === null || _b === void 0 ? true : delete _b.splitChunks;
    return mergedConfig;
};

const TempDir = "node_modules/@mojito/__pack";
function getPathFiles(entry, extname) {
    const files = [];
    const stat = fs.lstatSync(entry);
    if (stat.isDirectory()) {
        const paths = fs.readdirSync(entry);
        paths.forEach((p) => {
            const rels = getPathFiles(path.resolve(entry, p), extname);
            files.push(...rels);
        });
    }
    else {
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
function parseVue(filepath) {
    const buildpath = path.resolve(process.cwd(), TempDir);
    const files = getPathFiles(filepath, ".vue");
    if (fs.existsSync(buildpath)) {
        fs.rmSync(buildpath, { recursive: true });
    }
    fs.mkdirSync(buildpath, { recursive: true });
    files.forEach((v) => {
        const { descriptor, errors } = compilerSfc.parse(v.source.toString(), {
            filename: v.filename,
            sourceMap: false,
        });
        if (errors && errors.length) {
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
    return parseTs(`${buildpath}/**/*.ts`);
}
function parseTs(tsEntry, enptyPath) {
    const parseAST = (entryFile) => {
        // 解析入口文件AST
        const project = new tsMorph.Project({
            compilerOptions: {
                tsConfigFilePath: path.resolve(process.cwd(), "./tsconfig.json"),
                skipAddingFilesFromTsConfig: true,
                skipFileDependencyResolution: true,
            },
        });
        const sourceFiles = project.addSourceFilesAtPaths(entryFile);
        const components = [];
        sourceFiles.forEach((sourceFile) => {
            const filePath = sourceFile.getFilePath();
            const fileExports = { [filePath]: {} };
            // 获取所有导出
            const expos = sourceFile.getExportedDeclarations();
            expos.forEach((value, exportName) => {
                value.forEach((decla) => {
                    let pack = undefined;
                    const kindName = decla.getKindName();
                    if (kindName === "VariableDeclaration") {
                        // 解释 export const pack = CreatePack(...)
                        const variab = decla;
                        // 获取变量的初始化方式
                        const initer = variab.getInitializer();
                        if (initer && initer.getKindName() === "CallExpression") {
                            pack = parseCreatePack(initer);
                        }
                    }
                    else if (kindName === "CallExpression") {
                        // 解释 export default CreatePack(...)
                        pack = parseCreatePack(decla);
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
    const parseCreatePack = (callExpression) => {
        // 获取返回类型
        const returnType = callExpression.getReturnType();
        // const returnPropertys = returnType
        // 	.getProperties()
        // 	.map((property) => property.getName());
        const returnPropertys = returnType.getText();
        if (returnPropertys.includes("__root") &&
            returnPropertys.includes("__ref") &&
            returnPropertys.includes("__props") &&
            returnPropertys.includes("__component") &&
            returnPropertys.includes("__info") &&
            returnPropertys.includes("component") &&
            returnPropertys.includes("componentInfo") &&
            returnPropertys.includes("mount") &&
            returnPropertys.includes("unmount") &&
            returnPropertys.includes("setProps") &&
            returnPropertys.includes("getProps")) {
            // 确定是createPack调用， 获取createPack的两个参数
            const [arg1, arg2] = callExpression.getArguments();
            if (arg1 && arg2) {
                // 组件名称
                const component = arg1.getText();
                // 组件props
                const props = arg2;
                // 保存组件信息
                const componentInfo = { component };
                // 第二个参数是对象，获取对象里的字段和值
                const variables = props.getProperties();
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
    return parseAST(tsEntry);
}
function parseEntry(entry, filepath, basePack) {
    if (basePack === BasePack.vue) {
        return parseVue(filepath);
    }
    else if (basePack === BasePack.react) {
        return parseTs(entry);
    }
    else {
        throw new Error(`Cannot be identified ${entry}`);
    }
}
/**
 * 生成入口文件
 * @param allComponents
 * @param entryPath 入口文件路径
 * @param isHot 是否为热更新
 */
function createEntry({ entry }, opts) {
    const { basePack, isHot } = opts;
    const parsePath = entry.substring(0, entry.indexOf("*"));
    const entpryPath = path.resolve(process.cwd(), parsePath);
    const allComponents = parseEntry(entry, entpryPath, basePack);
    if (!allComponents || allComponents.length === 0)
        return [];
    let exportArr = [];
    const filterImports = [];
    const exportComponents = [];
    allComponents.forEach((component) => {
        for (let filePath in component) {
            const componentInfo = component[filePath];
            let importFile = "";
            if (filePath.includes(TempDir)) {
                filePath = filePath.substring(filePath.indexOf(TempDir) + TempDir.length);
                importFile = path.relative(process.cwd(), `${entpryPath}/${filePath}`);
            }
            else {
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
                    const lastName = sp[sp.length - 1];
                    let defaultName = lastName.includes(".") ? lastName.substring(0, lastName.indexOf(".")) : lastName;
                    if (defaultName === "index") {
                        // 使用最后一层目录
                        defaultName = sp[sp.length - 2] || "Component";
                    }
                    variable = defaultName;
                }
                else {
                    variable = exportName;
                }
                exportComponents.push({ export: variable, name: componentInfo[exportName].name });
                // 生成 export const BarChart = async ()=> (await import("./src/components/BarChart")).default;
                const exportText = `export const ${variable} = async ()=> (await import("./${importFile}")).${exportName};`;
                if (!isHot) {
                    exportArr.push(exportText);
                }
                else {
                    // watch模式下重新编译修过的文件
                    if (!filterImports.includes(importFile)) {
                        exportArr = exportArr.filter(text => !text.includes(importFile));
                        filterImports.push(importFile);
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
function parseExternals(configExternals) {
    const externals = {};
    const cdn = {};
    const confExternals = configExternals;
    if (Array.isArray(confExternals)) {
        throw new Error("请配置正确的externals, 格式：{ react: [react cdn, 'react'], lodash: [lodash cdn, '_'] ...}");
    }
    else if (typeof confExternals === "object") {
        for (const key in confExternals) {
            if (!Array.isArray(confExternals[key]) || confExternals[key].length < 1) {
                throw new Error("请配置正确的externals, 格式：{ react: [react cdn], lodash: [lodash cdn, '_'] ...}");
            }
            externals[key] = confExternals[key][1] || key;
            cdn[externals[key]] = confExternals[key][0];
        }
    }
    return { externals, cdn };
}

const pkg = require(`${process.cwd()}/package.json`);
pkg.name = pkg.name.replace(/[\\\/]/g, "-");
function checkBase() {
    const { dependencies, devDependencies } = pkg;
    const allDep = Object.assign(Object.assign({}, dependencies), devDependencies);
    if (allDep["@mojito/vue-pack"]) {
        return BasePack.vue;
    }
    else if (allDep["@mojito/react-pack"]) {
        return BasePack.react;
    }
}
/**
 * 创建webpack compiler
 * @param config
 * @param isDev
 * @returns
 */
function createCompiler(config, isDev) {
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
function production(config) {
    const { compiler, conf, exportComponents, externalInfo } = createCompiler(config);
    compiler.run((err, stats) => {
        if (err || (stats === null || stats === void 0 ? void 0 : stats.hasErrors())) {
            console.error("\x1b[43m%s\x1b[0m", "Error:", (err === null || err === void 0 ? void 0 : err.message) || (stats === null || stats === void 0 ? void 0 : stats.compilation.errors));
            process.exit(1);
        }
        compiler.close((closeErr) => {
            if (!closeErr) {
                if (exportComponents.length === 0) {
                    throw new Error("No Export Components");
                }
                fs.writeFileSync(`${conf.output.path}/mojito-pack.json`, JSON.stringify({
                    name: pkg.name,
                    version: pkg.version,
                    external: externalInfo === null || externalInfo === void 0 ? void 0 : externalInfo.cdn,
                    components: exportComponents,
                }));
                console.log('\x1b[32m%s\x1b[0m', "Build complete");
            }
            else {
                console.error(closeErr);
            }
        });
    });
}
/**
 * 启动WebpackDevServer
 * @param config
 */
function devServer(config) {
    var _a, _b;
    const { compiler, conf, externalInfo } = createCompiler(config, true);
    // 读取模版内容, 并替换importMap和import file内容
    let template = fs
        .readFileSync((_a = config.template) !== null && _a !== void 0 ? _a : path.resolve(__dirname, "./template.html"))
        .toString();
    if (externalInfo) {
        template = template.replace("{/* IMPORT_MAP */}", JSON.stringify(externalInfo.cdn));
    }
    template = template.replace("IMPORT_FILE", (_b = conf.output) === null || _b === void 0 ? void 0 : _b.filename).replace("PkgName", pkg.name).replace("PkgVersion", pkg.version);
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
    const runServer = () => __awaiter(this, void 0, void 0, function* () {
        console.log("Starting server...");
        yield server.start();
    });
    runServer();
}

yargs
    .option("dev", {
    alias: "D",
    describe: "启动一个开发服务器",
    type: "boolean",
})
    .option("port", {
    alias: "P",
    describe: "指定开发服务器端口",
    default: 3232,
    type: "number",
})
    .option("config", {
    alias: "C",
    describe: "指定配置文件",
    type: "string",
    default: "mojito.config.js",
})
    .option("help", { alias: "h" }).argv;
const args = yargs.argv;
const { dev, port, config } = args;
const configFile = `${process.cwd()}/${config}`;
const conf = require(configFile);
if (dev) {
    devServer(Object.assign(Object.assign({}, conf), { devServer: Object.assign({ port }, conf.devServer) }));
}
else {
    production(conf);
}
