import webpack from "webpack";
import { merge } from "webpack-merge";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import { EsbuildPlugin } from "esbuild-loader";
import { BasePack, MojitoCompilerConfig } from "./conf";

const progress = new webpack.ProgressPlugin();

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
		? `${process.cwd()}/${config.output.path}/${pkg.name}@${pkg.version}`
		: `${process.cwd()}/dist/${pkg.name}@${pkg.version}`;
	config.output.path = outPath;

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
			publicPath: isDev
				? ""
				: `${config.output.publicPath || "/public"}/${pkg.name}@${
						pkg.version
				  }/`,
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
				new EsbuildPlugin(),
			],
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					use: [
						{
							loader: path.resolve(__dirname, "../node_modules/vue-loader"),
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
							loader: path.resolve(__dirname, "../node_modules/esbuild-loader"),
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
							loader: path.resolve(__dirname, "../node_modules/url-loader"),
							options: {
								limit: 8192,
								publicPath: "",
								name: "[name][hash].[ext]",
								esModule: false,
							},
						},
					],
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
