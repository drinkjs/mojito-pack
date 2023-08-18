export declare function createOutFs(): import("memfs/lib/volume").Volume;
export declare function createServer(outPath: string, publicPath: string, cb: (err?: any) => void): void;
export declare function getComponentInfo(pkgName: string, pkgVersion: string, cdn?: Record<string, string>): Promise<unknown>;
export declare function outputBuild(outPath: string): void;
