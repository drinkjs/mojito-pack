import * as React from "react";
import {merge} from 'lodash';
import ChartBox, {ChartBoxProps} from "../../components/ChartBox";

interface ChartData {
  name: string;
  value: number;
}

interface Props extends ChartBoxProps {
  data: ChartData[];
}

export default (props: Props) => {
  const { option, data, ...restProps } = props;
  const _data = data || [];

  const opt = {
    title: {
        text: '过去7天全球趋势',
        textStyle:{
          color:"#fff"
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['新增', '死亡', '康复'],
        textStyle:{
          color:"#fff"
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2/15', '2/16', '2/17', '2/18', '2/19', '2/20', '2/21'],
        axisLine:{
          lineStyle:{
            color:"rgba(255,255,255,0.3)"
          }
        }
    },
    yAxis: {
        type: 'value',
        splitLine:{
          show: false,
        },
        axisLabel: {
            formatter: '{value}'
        },
        axisLine:{
          lineStyle:{
            color:"rgba(255,255,255,0.3)"
          }
        }
    },
    series: [
        {
            name: '新增',
            type: 'line',
            data: [10, 11, 13, 11, 12, 12, 9],
            smooth: true,
            itemStyle:{
              color:"#FF0000"
            }
        },
        {
            name: '死亡',
            type: 'line',
            data: [1, 2, 2, 5, 3, 2, 60],
            smooth: true,
            itemStyle:{
              color:"#660000"
            }
        },
        {
          name: '康复',
          type: 'line',
          data: [100, 25, 20, 50, 3, 28, 60],
          smooth: true,
          itemStyle:{
            color:"#ff7700"
          }
      }
    ]
};

  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
