import { FC, MouseEventHandler, useContext } from "react";
import { StoreContext } from "../../context/store/store.context";
import "./card.styles.scss";

interface ICard {
  type?: string;
  id: string;
  title: string;
  line1: string | null;
  line2: string;
  cardClick: MouseEventHandler<HTMLDivElement> | undefined;
}

export const Card: FC<ICard> = ({
  id,
  type,
  title,
  line1,
  line2,
  cardClick,
}) => {
  const { deleteAProject } = useContext(StoreContext);
  return (
    <div className="card-component-wrapper" onClick={cardClick}>
      <div className={`card-info ${type === "project" ? "" : "task"}`}>
        <h3 className="title">{title}</h3>
        <div className="date">
          {type === "task"
            ? "Start: " + line1?.substring(0, 10)
            : "Started: " + line1?.substring(0, 10)}
        </div>
        <p className="description">
          {type === "task" ? "End: " + line2 : line2}
        </p>
      </div>

      <div className="card-button-wrapper">
        <button>Edit</button>
        <button className="delete" onClick={() => deleteAProject(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
