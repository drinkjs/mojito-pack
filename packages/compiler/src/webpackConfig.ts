import webpack from "webpack";
import { merge } from "webpack-merge";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import { EsbuildPlugin } from "esbuild-loader";
import { BasePack, MojitoCompilerConfig } from "./conf";

const progress = new webpack.ProgressPlugin();
const cwd = process.cwd();

function loaderPath(loader:string){
	return path.resolve(__dirname, `../node_modules/${loader}`)
}

export default (
	config: MojitoCompilerConfig,
	pkg: any,
	{ isDev, basePack }: { isDev?: boolean; basePack?: BasePack }
): MojitoCompilerConfig => {
	const { entry } = config;

	if (!config.output) {
		config.output = {};
	}

	const outPath = config.output.path
		? `${cwd}/${config.output.path}/${pkg.name}@${pkg.version}`
		: `${cwd}/dist/${pkg.name}@${pkg.version}`;
	config.output.path = outPath;
	config.output.publicPath = isDev ? "" : `${config.output.publicPath || ""}/${pkg.name}@${pkg.version}/`

	const plugins: any[] = [];
	if (isDev) {
		plugins.push(
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "./index.html"),
				inject: false,
			})
		);
	} else {
		plugins.push(progress);
	}

	if (basePack === BasePack.vue) {
		plugins.push(new VueLoaderPlugin());
	}

	const getCssLoaders = (isModule:boolean, ...loaders:any[])=>{
		return [
			{
				loader: loaderPath("mojito-vue-style-loader"),
				options: {
					pkg,
				}
			},
			{
				loader: loaderPath("css-loader"),
				options: { importLoaders: 1, modules: isModule },
			},
			{
				loader: loaderPath("esbuild-loader"),
				options: {
					loader: 'css',
					minify: true,
				},
			},
			{
				loader: loaderPath("postcss-loader")
			},
			...loaders
		]
	}

	const baseConfig: MojitoCompilerConfig = {
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
			filename: `${pkg.name}.js`,
			chunkFilename: `${pkg.name}.[name].js`,
		},
		watchOptions: {
			aggregateTimeout: 800,
		},
		plugins,
		optimization: {
			minimizer: [
				new EsbuildPlugin({target: 'es2020'}),
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
						{
							loader: loaderPath("esbuild-loader"),
							options: {
								// JavaScript version to compile to
								target: "es2020",
								loader: basePack === BasePack.vue ? "ts" : undefined,
							},
						},
					],
					// exclude: /node_modules/,
				},
				{
					test: /\.(webp|png|jpg|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
					type: 'asset/resource'
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

	const mergedConfig: any = merge(config, baseConfig);
	delete mergedConfig.entry.polyfills;
	delete mergedConfig.entry.styles;
	delete mergedConfig.optimization?.runtimeChunk;
	delete mergedConfig.optimization?.splitChunks;
	return mergedConfig;
};
