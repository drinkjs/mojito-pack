import { CreatePack, MojitoComponentProps } from "@mojito/react-pack";
import { ChangeEvent, useCallback, useState } from "react";
import { Input } from "antd"

interface TextProps extends MojitoComponentProps {
	text?: string;
}

function Text({ text, $display, $style, $setProps }: TextProps) {
	const [isInput, setInput] = useState(false);
  const [inputText, setInputText] = useState(text);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
    setInputText(event.target.value);
  }, []);

  const onBlur = useCallback(()=>{
    setInput(false);
    $setProps && $setProps({text: inputText});
  }, [inputText])

	if ($display === "viewer" || !isInput) {
		return (
			<section
				style={{ ...$style }}
				onDoubleClick={() => {
					if ($display !== "viewer") {
						setInput(true);
					}
				}}
			>
				{text || ($display !== "viewer" && "请输入内容")}
			</section>
		);
	}

  return <Input value={inputText} onChange={onChange} onBlur={onBlur} />
}


export default CreatePack(Text, {
  name:"文本",
  props:{
    text:{
      name:"内容",
      type:"string"
    }
  }
})