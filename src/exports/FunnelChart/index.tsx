import * as React from "react";
import * as d3 from "d3";
import FunnelChart from "./funnelchart";

interface FunnelChartProps {
  data: {
    name: string;
    value: number;
    color?: string;
  }[];
  style?: string;
  styles?: React.CSSProperties;
}

const {useRef, useEffect} = React

export default ({ data, style = "2d", styles }: FunnelChartProps) => {
  const targetRef = useRef();
  const chartRef = useRef<any>();
  const svgRef = useRef<any>();

  useEffect(() => {
    draw()
  }, []);

  useEffect(() => {
    if (svgRef.current && chartRef.current) {
      svgRef.current.remove();
      draw();
    }
  }, [styles, style, data]);

  const draw = ()=>{
    const palette: any = [];
    if (!data || data.length < 1 || !Array.isArray(data)) return;

    data.sort((a, b) => {
      return b.value - a.value;
    });
    const chartData = data.map((v) => {
      if (v.color) {
        palette.push(v.color);
      }
      return { stage: v.name, value: v.value };
    });

    const svg = d3
      .select(targetRef.current)
      .append("svg")
      .attr("cursor", "default")
      // .attr("viewBox", [0, 0, 800, 600]);
      .attr("width", styles.width || 800)
      .attr("height", styles.height || 600);

    svgRef.current = svg;

    chartRef.current = new FunnelChart(svg).size([
      styles.width || 800,
      styles.height || 600,
    ]);
    chartRef.current
      .options({
        style,
        percentage: "first",
        palette: palette.length > 0 ? palette : d3.schemeTableau10,
        streamlined: false,
      })
      .data(chartData)
      .render();
    // .onclick((d: any) => console.log(d))
    // .onhover((d: any) => console.log(d));
  }

  return <div ref={targetRef}></div>;
};
