import { CreatePack } from "@drinkjs/mojito-react-pack";
import Earth from "./index";
import defaultData from "./data/defaultData.json";

export default CreatePack(Earth, {
	name: "点阵地球",
	props: {
		data: {
			name: "数据",
			type: "array",
			description: "Array<{ lat: string, lng: string, value: number }>",
			default: defaultData,
		},
		positions: {
			name:"位置",
			type:"object",
			description: `
{
	// 摄像机位置
	cp:{x:number, y:number, z:number},
	// 摄像机角度
	cr:{x:number, y:number, z:number},
	// 地球位置
	gp:{x:number, y:number, z:number},
	// 地球角度
	gr:{x:number, y:number, z:number},
}
	`,
		}
	},
	events: {
		onControl: {
			description: `({cp, cr, gp, gr})=>void`,
		},
	},
});
