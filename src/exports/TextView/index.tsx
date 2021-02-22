import * as React from "react";

interface TextViewProps {
  text: string;
  styles?: React.CSSProperties;
}

export default ({ text, styles }: TextViewProps) => {
  return (
    <div style={{ color: "blue", ...styles, width: "100%", height: "100%" }}>
      {text === undefined ? "请输入文档" : text}
    </div>
  );
};
