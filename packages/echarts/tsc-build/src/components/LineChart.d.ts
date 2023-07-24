import { ChartProps } from "../common/ChartContainer";
type LineChartData = {
    name: string;
    value: number;
};
interface LinehartProps extends ChartProps<LineChartData[]> {
    smooth?: boolean;
    itemColor?: string;
}
declare function LineChart({ data, smooth, itemColor, option, ...restProps }: LinehartProps): import("react/jsx-runtime").JSX.Element;
declare const _default: new () => {
    __component: typeof LineChart;
    __info: import("@mojito/react-pack").ComponentInfo;
    __root: import("react-dom/client").Root | null;
    __eventer: EventTarget | null;
    __props?: Record<string, any> | undefined;
    __id: string;
    framework: {
        name: string;
        version: string;
    };
    readonly component: typeof LineChart;
    readonly componentInfo: import("@mojito/react-pack").ComponentInfo;
    readonly componentId: string;
    mount(container: Element | DocumentFragment, props?: Record<string, any> | undefined, onMount?: ((props?: Record<string, any> | undefined) => void) | undefined): void;
    unmount(): void;
    setProps(newProps: any): void;
    setEvent(eventName: string, callback: (...args: any[]) => any, thisArg?: any): void;
    getProps(): Record<string, any> | undefined;
    getDefaultProps(): any;
};
export default _default;
