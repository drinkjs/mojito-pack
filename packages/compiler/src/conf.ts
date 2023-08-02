import {Configuration} from "webpack";

export const EntryFile = "./mojito.entry.ts"

export enum BasePack {
  vue="vue",
  react="react"
}

export interface MojitoCompilerConfig extends Configuration{
  entry:string,
  externals?:Record<string, string[] | string>,
  template?:string
} 