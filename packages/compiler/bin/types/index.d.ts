import "systemjs";
import { MojitoCompilerConfig } from "./conf";
/**
 * 发布生产包
 * @param config
 * @param callback
 */
export declare function production(config: MojitoCompilerConfig): void;
/**
 * 启动WebpackDevServer
 * @param config
 */
export declare function devServer(config: MojitoCompilerConfig): void;
