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
declare const _default: import("@mojito/react-pack").MojitoComponent<typeof LineChart>;
export default _default;
