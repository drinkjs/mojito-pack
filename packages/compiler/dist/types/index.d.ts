
/// <reference types="./client" />
import { Configuration } from 'webpack';

interface MojitoCompilerConfig extends Configuration {
    entry: string;
    externals?: Record<string, string[] | string>;
    template?: string;
}

/**
 * 发布生产包
 * @param config
 */
declare function production(config: MojitoCompilerConfig): void;
/**
 * 启动WebpackDevServer
 * @param config
 */
declare function devServer(config: MojitoCompilerConfig): void;

export { devServer, production };
