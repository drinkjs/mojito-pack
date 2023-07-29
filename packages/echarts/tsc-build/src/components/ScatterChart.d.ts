/// <reference types="react" />
import { ChartProps } from "../common/ChartContainer";
type ScatterChartData = {
    name: string;
    value: number;
};
interface ScatterChartProps extends ChartProps<ScatterChartData[]> {
}
declare function ScatterChart({ data, option, ...restProps }: ScatterChartProps): import("react/jsx-runtime").JSX.Element;
declare const _default: new () => {
    __component: typeof ScatterChart;
    __info: import("@mojito/react-pack").ComponentInfo;
    __root: import("react-dom/client").Root | null;
    __props?: Record<string, any> | undefined;
    __id: string;
    __ref: import("react").MutableRefObject<{
        updateProps: (props: Record<string, any>) => void;
    } | undefined>;
    framework: {
        name: string;
        version: string;
    };
    readonly component: typeof ScatterChart;
    readonly componentInfo: import("@mojito/react-pack").ComponentInfo;
    readonly componentId: string;
    mount(container: Element | DocumentFragment, props?: Record<string, any> | undefined, onMount?: ((props?: Record<string, any> | undefined) => void) | undefined): void;
    unmount(): void;
    setProps(newProps: Record<string, any>): void;
    getProps(): Record<string, any> | undefined;
    getDefaultProps(): any;
};
export default _default;
