import { Button } from "antd";
import { CreatePack, MojitoComponentProps } from "@drinkjs/mojito-react-pack";
import Container from "../../../common/Container"

interface PackButtonProps extends MojitoComponentProps{
  text: string;
  type?: string,
  onClick?: () => void;
  attributes: any;
}

const PackButton = ({
  text,
  onClick,
  type,
  attributes,
  __root,
}: PackButtonProps) => (
  <Container container={__root}>
    <Button {...attributes} onClick={onClick} type={type}>
      {text}
    </Button>
  </Container>
);

export default CreatePack(PackButton, {
  name: "按钮",
  category: "基础组件",
  props: {
    text: {
      name: "文字",
      type: "string",
      default: "按钮",
    },
    type:{
      name:"类型",
      type: ["default", "primary", "dashed",  "link",  "text"]
    },
    attributes: {
      name: "属性",
      type: "object",
      description: "https://ant.design/components/button-cn#api",
    },
  },
  events: {
    onClick: {
      name: "点击",
    },
  },
});
