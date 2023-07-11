import { ChartProps } from "../common/ChartContainer";
type ChartData = {
    name: string;
    value: number;
};
interface LinehartProps extends ChartProps {
    data: ChartData[];
    smooth?: boolean;
    itemColor?: string;
}
declare function LineChart({ data, smooth, itemColor, className, style, options, }: LinehartProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("@mojito/react-pack").MojitoComponent<typeof LineChart>;
export default _default;
