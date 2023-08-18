#!/usr/bin/env node
import yargs from "yargs";
import fs from "fs";
import { production, devServer } from "./index";

yargs
	.option("dev", {
		alias: "D",
		describe: "启动一个开发服务器",
		type: "boolean",
	})
	.option("port", {
		alias: "P",
		describe: "指定开发服务器端口",
		default: 3232,
		type: "number",
	})
	.option("config", {
		alias: "C",
		describe: "指定配置文件",
		type: "string",
		default: "mojito.config.js",
	})
	.option("help", { alias: "h" }).argv;

const args = yargs.argv as any;
const { dev, port, config } = args;
const configFile = `${process.cwd()}/${config}`;
const conf = require(configFile);

if (dev) {
	devServer({ ...conf, devServer: { port, ...conf.devServer } });
} else {
	production(conf);
}
