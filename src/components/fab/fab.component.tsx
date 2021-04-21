import { FC, MouseEventHandler } from "react";
import "./fab.styles.scss";

interface IFab {
  onClick: MouseEventHandler<HTMLDivElement>;
  icon: string | any;
  text?: string;
  shape?: "circle" | "pill";
}

export const Fab: FC<IFab> = ({
  onClick,
  icon = "+",
  text,
  shape = "circle",
}) => {
  return (
    <div
      className={text || shape === "pill" ? `fab-button pill` : `fab-button`}
      onClick={(e) => onClick(e)}
    >
      {text ? (
        <>
          <span>{icon}</span> {text}
        </>
      ) : (
        <span>{icon}</span>
      )}
    </div>
  );
};
