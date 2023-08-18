import { CreatePack } from "@mojito/react-pack";
import Earth from "./index";
import defaultData from "./data/defaultData.json";

export default CreatePack(Earth, {
	name: "点阵地球",
	props: {
		data: {
			name: "数据",
			type: "array",
			description: "{ lat: string, lng: string, value: number }[]",
			default: defaultData,
		},
	},
	events: {
		onControl: {
			description: `({cp, cr, gp, gr})=>void \n cp，cr摄像机的位置和角度，gp，gr地球的位置和角度`,
		},
	},
});
