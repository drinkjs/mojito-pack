const webpack = require("webpack");
const webpackConf = require("./webpack.conf");
const fs = require("fs");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const exportPath = "./src/exports";
const ROOT_PATH = path.resolve(process.cwd());
const APP_PATH = `${ROOT_PATH}/src`;
const extensions = [
  "index.js",
  "index.ts",
  "index.jsx",
  "index.tsx",
  "index.vue",
];
const declareFile = "declare.json";

const buildFile = [];

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
  if (buildFile.length > 0 && buildFile.indexOf(libName) === -1) return;
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
  const declare = JSON.parse(
    fs.readFileSync(`${entryPath}/${declareFile}`, "utf8")
  );
  // 没写组件名，使用目录名作为组件名
  if (!declare.name) {
    declare.name = libName;
    fs.writeFileSync(
      `${entryPath}/${declareFile}`,
      JSON.stringify(declare, null, 2)
    );
  }

  if (!declare.version) {
    console.error(`${declare.name}缺少版本号`);
    return;
  }

  buildConfs.push(
    webpackConf({
      entry,
      output: {
        filename: "bundle.js",
        library: libName + declare.version,
        libraryTarget: "umd",
        path: path.resolve(__dirname, `dist/${libName}`),
      },
      plugins: [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: `${exportPath}/${libName}/${declareFile}`,
              to: `${ROOT_PATH}/dist/${libName}/${declareFile}`,
            },
          ],
        }),
        new ZipPlugin(),
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
                  publicPath: `/public/libs/${declare.name}${declare.version}/resources/`,
                  outputPath: "resources/",
                  name: "[name].[ext]",
                  esModule: false,
                },
              },
            ],
          },
        ],
      },
    })
  );
});

function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}
// 清理
delDir("./dist");

// 一次最多打包三个组件，不然很容易崩
startBuild(buildConfs.splice(0, 3));

function startBuild(confs) {
  // 开始build
  webpack(confs, (err, stats) => {
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

    if (buildConfs.length > 0) {
      startBuild(buildConfs.splice(0, 3));
    } else {
      console.log("打包完成");
    }
  });
}
