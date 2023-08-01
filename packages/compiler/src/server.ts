import { Volume } from 'memfs';
import fs from "fs"
import path from "path"
import http from "http"
import { JSDOM } from "jsdom"
import detect from "detect-port";

const vol = new Volume();

/**
 * 把真实文件系统转换到memfs系统
 * @param vol
 * @param rootPaths
 * @param parent
 */
function pathTree(vol: any, rootPaths: string[], parent?: string) {
  rootPaths.forEach((rootPath) => {
    const absPath = parent ? path.resolve(parent, rootPath) : rootPath;
    const stat = fs.lstatSync(absPath);
    if (!parent || stat.isDirectory()) {
      // 创建memfs目录
      const paths = fs.readdirSync(absPath);
      if (!vol.existsSync(absPath)) {
        vol.mkdirSync(absPath, { recursive: true });
      }
      pathTree(vol, paths, absPath);
    } else if (stat.isFile()) {
      // 创建memfs文件
      const filePath = path.dirname(absPath);
      if (!vol.existsSync(filePath)) {
        vol.mkdirSync(filePath, { recursive: true });
      }
      vol.writeFileSync(absPath, fs.readFileSync(absPath).toString());
    } else if (stat.isSymbolicLink()) {
      // 创建memfs快捷方式
      const linkPath = fs.readlinkSync(absPath);
      const paths = fs.readdirSync(linkPath);
      pathTree(vol, paths, linkPath);
      vol.symlinkSync(linkPath, absPath);
    }
  });
}

export function createOutFs() {
  return vol;
}

let port = 3838;

export function createServer(outPath: string, publicPath: string, cb:(err?:any)=>void) {
  const server = http.createServer((req, res) => {
    if (req.url) {
      try {
        const filePath = req.url.replace(publicPath.substring(0, publicPath.length - 1), "");
        const text = vol.readFileSync(`${outPath}${filePath}`).toString();
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.write(text);
        res.end();
      } catch (e) {
        console.log(e)
      }
    }
  });

  server.on('listening', () => {
    cb()
  })

  detect(port)
  .then(_port => {
    port = _port;
    server.listen(_port)
  })
  .catch(err => {
    console.log(err);
    process.exit(1)
  });
}

export async function getComponentInfo(pkgName: string, pkgVersion: string, cdn?: Record<string, string>) {
  console.log("Get component info...")
  const importMaps = { ...cdn, [pkgName]: `http://127.0.0.1:${port}/${pkgName}.js` }
  const html = `
		<html>
		<head>
			<script src="file://E:/project/drinkjs/mojito-compack/packages/compiler/node_modules/systemjs/dist/system.min.js"></script>
			<script>
				System.addImportMap({
					imports: ${JSON.stringify(importMaps)},
				});
				components= {}
				async function load(){
					const components = await System.import("${pkgName}");
					for (const key in components) {
						if (key !== "__esModule" && typeof components[key]) {
							const comp = await components[key]();
							components[key] = new comp
						}
					}
          window.onComponents(components)
				}
				load()
			</script>
		</head>
		<body>
		</body>
		</html>
	`

  const { window } = new JSDOM(html, { runScripts: "dangerously", resources: "usable", url: `http://127.0.0.1:${port}` });

  return new Promise((resolve) => {
    window.onComponents = (components: any) => {
      console.log(components)
      resolve(components);
    }
  })

}