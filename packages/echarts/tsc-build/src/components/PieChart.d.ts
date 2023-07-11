import { ChartProps } from "../common/ChartContainer";
type PieChartData = {
    name: string;
    value: number;
};
interface PieCharProps extends ChartProps<PieChartData[]> {
    radius?: string | number;
}
declare function PieChart({ data, radius, option, ...restProps }: PieCharProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("@mojito/react-pack").MojitoComponent<typeof PieChart>;
export default _default;
