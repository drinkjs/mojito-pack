import * as React from "react";

interface TextViewProps {
  text: string;
  styles?: React.CSSProperties;
}

export default ({ text, styles }: TextViewProps) => {
  return (
    <div style={{ color: "blue", width: "100%", height: "100%", display:"flex", alignItems:"center", justifyContent:"center", ...styles }}>
      {text}
    </div>
  );
};
