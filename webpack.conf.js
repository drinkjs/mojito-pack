const path = require("path");
const { merge } = require('webpack-merge');
const WebpackBar = require('webpackbar');
const ROOT_PATH = path.resolve(process.cwd());
const APP_PATH = `${ROOT_PATH}/src`;
const rules = require("./webpack.rules");

const publicPath = "/";

module.exports = function(webpackConf) {
  const conf = {
    mode: "production",
    entry: "./src/index.js",
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      echarts: "echarts",
      antd: "antd",
      THREE: "three",
    },
    plugins: [
      new WebpackBar()
    ],
    // 默认import的后缀名
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
      modules: ["node_modules", APP_PATH],
      alias: {
        src: APP_PATH,
      },
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: [{ loader: "babel-loader" }],
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
          exclude: /node_modules/,
        },
        // {
        //   test: /\.(png|jpg|gif|jpeg)$/,
        //   use: [
        //     {
        //       loader: "url-loader",
        //       options: {
        //         limit: 8192,
        //         publicPath: `/libs/${declare.libName}/${declare.version}/resources/`,
        //         outputPath: "resources/",
        //         name: "[name].[ext]",
        //       },
        //     },
        //   ],
        // },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                import: true,
                modules: {
                  localIdentName: "[name]_[local]__[hash:base64:5]",
                },
              },
            },
          ],
        },
        ...rules,
      ],
    },
  };
  return webpackConf ? merge(conf, webpackConf) : conf;
};
