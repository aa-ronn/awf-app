import { FC, MouseEventHandler } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import "./fab.styles.scss";

interface IFab {
  onClick: MouseEventHandler<HTMLDivElement>;
  icon: FontAwesomeIconProps | any;
  text?: string;
  shape?: "circle" | "pill";
}

export const Fab: FC<IFab> = ({ onClick, icon, text, shape = "circle" }) => {
  return (
    <div
      className={text || shape === "pill" ? `fab-button pill` : `fab-button`}
      onClick={(e) => onClick(e)}
    >
      {text ? (
        <>
          <FontAwesomeIcon icon={icon} />
          {text}
        </>
      ) : (
        <FontAwesomeIcon icon={icon} />
      )}
    </div>
  );
};
