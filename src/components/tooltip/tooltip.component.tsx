import { FC } from "react";

import "./tooltip.styles.scss";

export const Tooltip: FC<{
  text?: string | null | undefined | string[][];
  textArray?: string[][] | null | undefined;
  position?: "top" | "bottom" | "right" | "left";
}> = ({ children, text, textArray, position = "top" }) => {
  return (
    <div className="tooltip-component">
      <div className={`tooltiptext ${position}`}>
        {text && text}
        {textArray &&
          textArray[0] &&
          textArray[0].map((item, index) => {
            return (
              <div key={index} className="name-list-item">
                {item}
              </div>
            );
          })}
      </div>
      {children}
    </div>
  );
};
