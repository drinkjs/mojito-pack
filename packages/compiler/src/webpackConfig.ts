import webpack from "webpack"
import {merge} from "webpack-merge"
import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"

const progress = new webpack.ProgressPlugin();

export default (config:webpack.Configuration, pkg:any, isDev?:boolean):webpack.Configuration=>{
  let entry:any = config.entry;
  if(typeof config.entry === "string"){
    entry = config.entry;
  }else if(Array.isArray(config.entry)){

  }else if(typeof config.entry === "object"){
    let main = `${process.cwd()}/${config.entry.main}`;
    entry = {...config.entry, main} 
  }

  if (!config.output) {
    config.output = {};
  }
  const outPath = config.output.path ? `${process.cwd()}/${config.output.path}/${pkg.name}@${pkg.version}` : `${process.cwd()}/dist/${pkg.name}@${pkg.version}`;
  config.output.path = outPath;

  const baseConfig: webpack.Configuration = {
    entry,
    mode: isDev ? "development" : "production",
    resolve: {
			extensions: [".tsx", ".ts", ".js", ".json", ".vue"],
		},
    externalsType:"system",
    output: {
      clean: true,
      libraryTarget: "system",
      crossOriginLoading: "anonymous",
      publicPath: '',
      filename: `${pkg.name}.js`,
      chunkFilename:`${pkg.name}.[name].js`
    },
    watchOptions: {
      aggregateTimeout: 800,
    },
    plugins: isDev ? [new HtmlWebpackPlugin({template: path.resolve(__dirname, "./index.html"), inject: false})] :[
      progress,
    ],
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/](react|react-dom|echarts)[\\/]/,
    //         name: 'vendor',
    //         chunks: 'all',
    //       },
    //     },
    //   },
    // },
    module: {
      rules: [
        {
					test: /\.tsx?$/,
          use: path.resolve(__dirname, "../node_modules/ts-loader"),
					exclude: /node_modules/,
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
  }

  const mergedConfig:any = merge(config, baseConfig);
  delete mergedConfig.entry.polyfills;
  delete mergedConfig.entry.styles;
  delete mergedConfig.optimization?.runtimeChunk;
  delete mergedConfig.optimization?.splitChunks;
  return mergedConfig;
}