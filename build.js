const webpack = require("webpack");
const webpackConf = require("./webpack.conf");
const fs = require("fs");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipPlugin = require('zip-webpack-plugin');
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const exportPath = "./src/exports";
const ROOT_PATH = path.resolve(process.cwd());
const APP_PATH = `${ROOT_PATH}/src`;
const extensions = ["index.js", "index.ts", "index.jsx", "index.tsx"];
const declareFile = "declare.json"

// 扫描目录
const files = fs.readdirSync(exportPath);
const libs = [];
files.forEach(function (item, index) {
  let stat = fs.lstatSync(`${exportPath}/${item}`);
  if (stat.isDirectory() === true) {
    libs.push(item);
  }
});

// build设置
const buildConfs = [];
libs.forEach((libName) => {
  const entryPath = `${exportPath}/${libName}`;
  let entry = "";

  // 检查文件是否存在于当前目录中。
  for (const file of extensions) {
    try {
      fs.accessSync(`${entryPath}/${file}`, fs.constants.F_OK);
      entry = `${entryPath}/${file}`;
      break;
    } catch (e) {}
  }

  if (!entry) return;

  // 描述文件
  const declare = JSON.parse(fs.readFileSync(`${entryPath}/${declareFile}`, 'utf8'));
  declare.libName = libName;
  fs.writeFileSync(`${entryPath}/${declareFile}`, JSON.stringify(declare, null, 2));

  if(!declare.version){
    console.error(`${declare.libName}缺少版本号`);
    return;
  }

  buildConfs.push(
    webpackConf({
      entry,
      output: {
        filename: "bundle.js",
        library: libName+declare.version,
        libraryTarget: "umd",
        path: path.resolve(__dirname, `dist/${libName}`),
      },
      plugins: [
        // new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
          {
            context: `${APP_PATH}/exports/${libName}`,
            from: declareFile,
            to: declareFile,
          },
        ]),
        new ZipPlugin()
      ],
      module: {
        rules: [
          {
            test: /\.(png|jpg|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 8192,
                  publicPath: `/libs/${declare.libName}/${declare.version}/resources/`,
                  outputPath: "resources/",
                  name: "[name].[ext]",
                  esModule: false,
                },
              },
            ],
          },
        ]
      }
    })
  );
});

function delDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      fs.rmdirSync(path);
  }
}
// 清理
delDir("./dist")
// 开始build
webpack(buildConfs, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  console.log(
    stats.toString({
      colors: true, // 在控制台展示颜色
    })
  );
});
