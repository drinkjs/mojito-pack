/// <reference types="node" />
import { BasePack, MojitoCompilerConfig } from "./conf";
type ExportComponent = {
    export: string;
    name: string;
    category?: string;
    cover?: string;
};
export declare function getPathFiles(entry: string, extname?: string): {
    filename: string;
    extname: string;
    basename: string;
    source: string | Buffer;
}[];
export declare function parseVue(filepath: string): Record<string, Record<string, any>>[];
export declare function parseTs(tsEntry: string, enptyPath: string): Record<string, Record<string, any>>[];
export declare function parseEntry(entry: string, filepath: string, basePack?: BasePack): Record<string, Record<string, any>>[];
/**
 * 生成入口文件
 * @param allComponents
 * @param entryPath 入口文件路径
 * @param isHot 是否为热更新
 */
export declare function createEntry({ entry }: MojitoCompilerConfig, opts: {
    basePack?: BasePack;
    isHot?: boolean;
}): ExportComponent[];
/**
 * 解释externals参数，获取依赖
 * @param configExternals
 * @returns
 */
export declare function parseExternals(configExternals: any): {
    externals: Record<string, string>;
    cdn: Record<string, string>;
};
export {};
