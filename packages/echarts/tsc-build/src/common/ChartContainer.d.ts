/// <reference types="react" />
import * as echarts from "echarts";
import { MojitoComponentProps } from "@mojito/react-pack/dist";
export interface ChartProps<T = any> extends MojitoComponentProps {
    option?: echarts.EChartsCoreOption;
    style?: React.CSSProperties;
    className?: string;
    theme?: string;
    data?: T;
}
export default function ChartContainer({ option, style, className, theme, $style, ...restProps }: ChartProps): import("react/jsx-runtime").JSX.Element;
