/// <reference types="react" />
import { ChartProps } from "../common/ChartContainer";
type PieChartData = {
    name: string;
    value: number;
};
interface PieCharProps extends ChartProps<PieChartData[]> {
    radius?: string | number;
}
declare function PieChart({ data, radius, option, ...restProps }: PieCharProps): import("react/jsx-runtime").JSX.Element;
declare const _default: new () => {
    __component: typeof PieChart;
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
    readonly component: typeof PieChart;
    readonly componentInfo: import("@mojito/react-pack").ComponentInfo;
    readonly componentId: string;
    mount(container: Element | DocumentFragment, props?: Record<string, any> | undefined, onMount?: ((props?: Record<string, any> | undefined) => void) | undefined): void;
    unmount(): void;
    setProps(newProps: Record<string, any>): void;
    getProps(): Record<string, any> | undefined;
    getDefaultProps(): any;
};
export default _default;
