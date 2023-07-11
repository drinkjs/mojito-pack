/// <reference types="react" />
import * as echarts from "echarts";
export interface ChartProps<T = any> {
    option?: echarts.EChartsCoreOption;
    style?: React.CSSProperties;
    className?: string;
    theme?: string;
    data?: T;
}
export default function ChartContainer({ option, style, className, theme, ...restProps }: ChartProps): import("react/jsx-runtime").JSX.Element;
