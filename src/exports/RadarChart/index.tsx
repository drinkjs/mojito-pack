import * as React from "react";
import {merge} from 'lodash';
import ChartBox, {ChartBoxProps} from "../../components/ChartBox";

interface ChartData {
  name: string;
  value: number;
  max: number;
}

interface Props extends ChartBoxProps {
  data: ChartData[];
}

export default (props: Props) => {
  const { option, data, ...restProps } = props;
  const _data = data || [];

  const opt = {
    tooltip: {},
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: _data.length > 0  ? _data : [
            { name: '', max: 6500},
            { name: '', max: 16000},
            { name: '', max: 30000},
            { name: '', max: 38000},
            { name: '', max: 52000},
        ]
    },
    series: [{
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
            {
                value: _data.map(v => v.value),
            },
        ]
    }]
};

  return <ChartBox {...restProps} option={option ? merge(opt, option) : opt} />;
};
