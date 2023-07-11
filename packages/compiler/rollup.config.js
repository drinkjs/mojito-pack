import pkg  from "./package.json"
import typescript from "@rollup/plugin-typescript";
// import dts from "rollup-plugin-dts";

const banner = `/*!
  * ${pkg.name} ${pkg.version}
  * MIT license
*/
`;

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        format: "cjs",
        file: "dist/index.cjs.js",
        banner
      },
      {
        format: "es",
        file: "dist/index.esm.js",
        banner
      }
    ],
    plugins: [
      typescript({
          tsconfig: './tsconfig.json'
      })
    ]
  },
  {
    input: "./src/bin.ts",
    output: [
      {
        format: "cjs",
        file: "bin/index.js",
      },
    ],
    plugins: [
      typescript()
    ]
  },
  // {
  //   input: "src/index.ts",
  //   output: [{ file: "dist/index.d.ts", format: "es", banner }],
  //   plugins: [dts.default()]
  // }
];