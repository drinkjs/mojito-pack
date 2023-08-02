import { Volume } from 'memfs';
import fs from "fs"
import path from "path"
import http from "http"
import { JSDOM } from "jsdom"
import detect from "detect-port";

const vol = new Volume();
let port = 4567;

export function createOutFs() {
  return vol;
}

export function createServer(outPath: string, publicPath: string, cb: (err?: any) => void) {
  const server = http.createServer((req, res) => {
    if (req.url) {
      try {
        const filePath = req.url.replace(publicPath.substring(0, publicPath.length - 1), "");
        const text = vol.readFileSync(`${outPath}${filePath}`);
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.write(text);
        res.end();
      } catch (e) {
        console.error(e);
        process.exit(1);
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
      console.error(err);
      process.exit(1)
    });
}

export async function getComponentInfo(pkgName: string, pkgVersion: string, cdn?: Record<string, string>) {
  console.log("Checking components...");
  const systemPath = path.resolve(__dirname, "../node_modules/systemjs/dist/system.min.js")
  const importMaps = { ...cdn, [pkgName]: `http://127.0.0.1:${port}/${pkgName}.js` }
  const html = `
		<html>
		<head>
			<script src="file://${systemPath}"></script>
			<script>
				System.addImportMap({
					imports: ${JSON.stringify(importMaps)},
				});
				components= {}
				async function load(){
					const components = await System.import("${pkgName}");
					for (const key in components) {
						if (typeof components[key] === "function") {
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
      resolve(components);
    }
  })
}

export function outputBuild(outPath: string) {
  if (fs.existsSync(outPath)) {
    fs.rmSync(outPath, { recursive: true })
  }
  fs.mkdirSync(outPath, { recursive: true });
  const files = vol.readdirSync(outPath);
  console.log(`\x1b[32m${path.normalize(outPath)}`);
  files.forEach(file => {
    vol.createReadStream(`${outPath}/${file}`).pipe(fs.createWriteStream(`${outPath}/${file}`));
    console.log("\t"+file)
  })
  console.log("\x1b[0m")
}