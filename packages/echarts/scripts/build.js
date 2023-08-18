const pkg = require("../package.json")
const compiler = require("@mojito/compiler")

compiler({entry: `${process.cwd()}/src/index.tsx`}, pkg.version)