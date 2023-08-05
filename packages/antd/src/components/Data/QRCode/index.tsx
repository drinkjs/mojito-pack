import { QRCode } from "antd";
import { CreatePack } from "@mojito/react-pack";

const PackButton = ({
  value,
  icon,
  size
}: {
  value: string;
  icon?: string,
  size?: number
}) => (
  <QRCode size={size} value={value} icon={icon}  />
);

export default CreatePack(PackButton, {
  name: "二维码",
  category: "数据展示",
  props: {
    value: {
      name: "扫描后的文本",
      type: "string",
      default: "https://github.com/drinkjs/mojito",
    },
    icon:{
      name:"图标",
      type:"string",
      description:"二维码中图片的地址（目前只支持图片地址"
    },
    size:{
      name:"大小",
      type:"number",
      default: 160
    }
  },
});
