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
declare const _default: import("@mojito/react-pack").MojitoComponent<typeof BarChart>;
export default _default;
