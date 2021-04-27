import { FC } from "react";

import "./tooltip.styles.scss";

export const Tooltip: FC<{
  text: string | null | undefined | string[][];
  position?: "top" | "bottom" | "right" | "left";
}> = ({ children, text, position = "top" }) => {
  return (
    <div className="tooltip-component">
      <span className={`tooltiptext ${position}`}>{text}</span>
      {children}
    </div>
  );
};
