import { ChartProps } from "../common/ChartContainer";
type BarChartData = {
    name: string;
    value: number;
};
interface BarChartProps extends ChartProps<BarChartData[]> {
    itemColors?: string[];
}
declare function BarChart({ data, itemColors, option, ...restProps }: BarChartProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("@mojito/react-pack").MojitoComponent<typeof BarChart>;
export default _default;
