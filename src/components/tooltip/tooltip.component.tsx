import { FC } from "react";

import "./tooltip.styles.scss";

export const Tooltip: FC<{ text: string | null | undefined | string[] }> = ({
  children,
  text,
}) => {
  return (
    <div className="tooltip-component">
      <span className="tooltiptext">{text}</span>
      {children}
    </div>
  );
};
