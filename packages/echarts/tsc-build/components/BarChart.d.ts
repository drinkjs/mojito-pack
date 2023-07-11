import { ChartProps } from "../common/ChartContainer";
type ChartData = {
    name: string;
    value: number;
};
interface BarChartProps extends ChartProps {
    data: ChartData[];
    itemColors?: string[];
}
declare function BarChart({ data, itemColors, className, style, options, }: BarChartProps): import("react/jsx-runtime").JSX.Element;
export declare const Barch: import("@mojito/react-pack").MojitoComponent<typeof BarChart>;
declare const _default: import("@mojito/react-pack").MojitoComponent<() => import("react/jsx-runtime").JSX.Element>;
export default _default;
declare const aaa: import("@mojito/react-pack").MojitoComponent<() => import("react/jsx-runtime").JSX.Element>;
export { aaa };
