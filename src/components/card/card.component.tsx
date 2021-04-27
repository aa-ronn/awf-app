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
  addMembersClick?: (type: string, id?: string) => void | undefined;
  editTaskClick?: (
    type: string,
    taskID: string,
    title: string,
    due_Date: string,
    description: string
  ) => void | undefined;
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
  addMembersClick,
  editTaskClick,
}) => {
  const { workingProject, deleteAProject, deleteATask } = useContext(
    StoreContext
  );

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
          {type === "task" && "End: "}
          {type === "task" && line2 !== undefined && line2}
          {type === "task" && line2 === "" && "♾️"}
        </div>
        <p className="description">
          {type === "project" && line2}
          {type === "task" && line3 && line3}
        </p>

        {type === "task" && workingProject?.tasks && (
          <div className="assigned-members-wrapper">
            <Tooltip
              text={
                workingProject.tasks &&
                workingProject.tasks
                  .filter((taskId) => taskId.id === id)
                  .map((task) => {
                    let text: string[] = [];
                    if (task.assigned_to && task.assigned_to.length > 0) {
                      task.assigned_to?.forEach((member) => {
                        text.push(
                          member.firstName + " " + member.lastName + "\n"
                        );
                      });
                    } else {
                      text.push("No members assigned");
                    }
                    return text;
                  })
              }
            >
              <div className="assigned-members">
                {workingProject.tasks &&
                  workingProject.tasks
                    .filter((taskId) => taskId.id === id)
                    .map((task) => {
                      if (task.assigned_to && task.assigned_to.length > 0) {
                        return "Members assigned " + task.assigned_to.length;
                      } else {
                        return "No members assigned";
                      }
                    })}
              </div>
            </Tooltip>

            <div className="assigned-members">
              {addMembersClick && (
                <Tooltip text="Assign a member to task">
                  <button onClick={() => addMembersClick("member", id)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="card-button-wrapper">
        {type === "task" && (
          <Fragment>
            {editTaskClick && line3 && (
              <button
                onClick={() =>
                  editTaskClick("edit-task", id, title, line2, line3)
                }
              >
                Edit
              </button>
            )}
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
