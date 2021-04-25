import { FC, Fragment, MouseEventHandler, useContext } from "react";
import { StoreContext } from "../../context/store/store.context";
import "./card.styles.scss";

interface ICard {
  type?: string;
  id: string;
  secondaryId?: string;
  title: string;
  line1: string | null;
  line2: string;
  cardClick: MouseEventHandler<HTMLDivElement> | undefined;
}

export const Card: FC<ICard> = ({
  id,
  secondaryId = "0",
  type,
  title,
  line1,
  line2,
  cardClick,
}) => {
  const { deleteAProject, updateATask, deleteATask } = useContext(StoreContext);
  return (
    <div className="card-component-wrapper">
      <div
        className={`card-info ${type === "project" ? "" : "task"}`}
        onClick={cardClick}
      >
        <h3 className="title">{title}</h3>
        <div className="date">
          {type === "task"
            ? "Start: " + line1?.substring(0, 10)
            : "Started: " + line1?.substring(0, 10)}
        </div>
        <p className="description">
          {type === "task" && line2 !== undefined && "End: " + line2}
          {type === "task" && line2 === undefined && "End: ♾️"}
          {type === "project" && line2}
        </p>
      </div>
      <div className="card-button-wrapper">
        {type === "task" && (
          <Fragment>
            <button onClick={() => {}}>Edit</button>
            <button
              className="delete"
              onClick={() => deleteATask(id, secondaryId)}
            >
              Delete
            </button>
          </Fragment>
        )}
        {type === "project" && (
          <button className="delete" onClick={() => deleteAProject(id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
