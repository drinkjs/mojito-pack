import * as React from "react";

interface LayerProps {
  styles?: React.CSSProperties;
}

export default ({ styles }: LayerProps) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        ...styles,
      }}
    />
  );
};
