/// <reference types="react" />
import * as echarts from "echarts";
export interface ChartProps {
    options?: echarts.EChartsCoreOption;
    style?: React.CSSProperties;
    className?: string;
}
export default function ChartContainer({ options, style, className }: ChartProps): import("react/jsx-runtime").JSX.Element;
