import React from "react";
import Tooltip from "react-native-walkthrough-tooltip";

interface Props {
  children: JSX.Element;
  content: React.ReactElement;
  visible: boolean;
  color: string;
  setVisible: () => void;
  onClose: () => void;
  placement?: "top" | "bottom" | "left" | "right" | "center";
}

function ToolTip(props: Props) {
  return (
    <Tooltip
      content={props.content}
      contentStyle={{ backgroundColor: props.color, width: "auto" }}
      isVisible={props.visible}
      placement={props.placement}
      onClose={() => props.setVisible()}
    >
      {props.children}
    </Tooltip>
  );
}
export default ToolTip;
