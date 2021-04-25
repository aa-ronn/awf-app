import { FC, Fragment, MouseEventHandler, useContext } from "react";
import { Tooltip } from "../tooltip/tooltip.component";
import { StoreContext } from "../../context/store/store.context";
import "./card.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface ICard {
  type?: string;
  id: string;
  secondaryId?: string;
  title: string;
  line1: string | null;
  line2: string;
  line3?: string;
  cardClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

export const Card: FC<ICard> = ({
  id,
  secondaryId = "0",
  type,
  title,
  line1,
  line2,
  line3,
  cardClick,
}) => {
  const {
    workingProject,
    deleteAProject,
    updateATask,
    deleteATask,
  } = useContext(StoreContext);
  return (
    <div
      className={`card-component-wrapper ${
        type === "project" ? "project" : "task"
      }`}
    >
      <div
        className={`card-info ${type === "project" ? "" : "task"}`}
        onClick={type === "project" ? cardClick : () => void ""}
      >
        <h3 className="title">{title}</h3>
        <div className="date">
          {type === "task"
            ? "Start: " + line1?.substring(0, 10)
            : "Started: " + line1?.substring(0, 10)}
        </div>
        <div className="date">
          {type === "task" && line2 !== undefined && "End: " + line2}
          {type === "task" && line2 === undefined && "End: ♾️"}
        </div>
        <p className="description">
          {type === "project" && line2}
          {type === "task" && line3 && line3}
        </p>
        {type === "task" ? (
          workingProject?.tasks !== null &&
          workingProject?.tasks[0].assignedTo ? (
            <Tooltip
              text={
                workingProject?.tasks &&
                workingProject?.tasks.map((task) => {
                  return task.assignedTo + "\n";
                })
              }
            >
              <div className="assigned-members">
                {workingProject?.tasks !== null &&
                  workingProject?.tasks[0].assignedTo &&
                  "Members Assigned: " +
                    workingProject?.tasks[0].assignedTo.length}
              </div>
              <div className="assigned-members">
                <Tooltip text="Assign a member to task">
                  <button>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </Tooltip>
              </div>
            </Tooltip>
          ) : (
            <div className="assigned-members">
              <p>No Members Assigned</p>
              <Tooltip text="Assign a member">
                <button>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </Tooltip>
            </div>
          )
        ) : null}
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
