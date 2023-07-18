import { CreatePack } from "@mojito/react-pack";
import Earth from "./index";
import covid19 from "./data/covid2019.json";

export default CreatePack(Earth, {
	name: "点阵地球",
	props: {
		data: {
			name: "数据",
			type: "array",
			description: "{ lat: string, lng: string, value: number }[]",
			default: covid19,
		},
	},
	events: {
		onControl: {
			description: `({cp, cr, gp, gr})=>void \n cp，cr摄像机的位置和角度，gp，gr地球的位置和角度`,
		},
	},
});
