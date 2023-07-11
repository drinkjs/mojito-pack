import webpack from "webpack";
export declare function compile(config: webpack.Configuration, callback?: (filename: string) => void): void;
export declare function devServer(config: webpack.Configuration): void;
export declare function parseExternals(configExternals: any): {
    externals: Record<string, string>;
    cdn: Record<string, string>;
};
