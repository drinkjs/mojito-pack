import { ChartProps } from "../common/ChartContainer";
type ScatterChartData = {
    name: string;
    value: number;
};
interface ScatterChartProps extends ChartProps<ScatterChartData[]> {
}
declare function ScatterChart({ data, option, ...restProps }: ScatterChartProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("@mojito/react-pack").MojitoComponent<typeof ScatterChart>;
export default _default;
