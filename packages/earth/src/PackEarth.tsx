import { CreatePack } from "@mojito/react-pack";
import Earth from "./index"

export default CreatePack(
	Earth,
	{
		name: "地球",
		props: {},
		events: {
			onControl: {
				description: `({cp, cr, gp, gr})=>void \n cp，cr摄像机的位置和角度，gp，gr地球的位置和角度`
			}
		}
	}
)