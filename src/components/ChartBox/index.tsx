import * as React from "react";
import * as echarts from "echarts";

const { useState, useRef, useEffect } = React;

export interface ChartBoxProps {
  option?: any;
  styles?: React.CSSProperties;
  className?: string;
  theme?:"dark"|"light"
}

export default ({ option, theme, styles, ...restProps }: ChartBoxProps) => {
  const [chart, setChart] = useState<echarts.ECharts>();
  const targetRef = useRef();

  // const colors = theme === "dark" ? {
  //   backgroundColor: "#2c343c",
  //   textStyle: {
  //     color: "rgba(255, 255, 255, 0.5)",
  //   },
  // } : {
  //   backgroundColor: "rgba(255, 255, 255, 0)",
  //   textStyle: {
  //     color: "rgba(0, 0, 0, 0.8)",
  //   },
  // }

  useEffect(() => {
    const myChart = echarts.init(targetRef.current);
    myChart.setOption({
      // ...colors,
      ...option,
    });
    setChart(myChart);
    return () => {
      if (myChart) {
        myChart.clear();
        myChart.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (chart) chart.setOption({...option});
  }, [option, theme, chart]);

  useEffect(() => {
    if (chart) chart.resize();
  }, [chart, styles]);

  return (
    <div
      ref={targetRef}
      {...restProps}
      style={{ width: "100%", height: "100%", ...styles }}
    ></div>
  );
};
