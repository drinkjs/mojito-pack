import { Configuration } from "webpack";
export declare const EntryFile = "./mojito_entry.ts";
export declare enum BasePack {
    vue = "vue",
    react = "react"
}
export interface MojitoCompilerConfig extends Configuration {
    entry: string;
    externals?: Record<string, string[] | string>;
    template?: string;
}
