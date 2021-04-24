import { useContext } from "react";
import { StoreContext } from "../../context/store/store.context";
import { Fab } from "../../components/fab/fab.component";
import { Card } from "../../components/Card/card.component";
import "./tasks.styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const TasksPage = () => {
  const { assignedTasks, createATask } = useContext(StoreContext);
  const handleCardClick = async (taskID: string) => {
    console.log(taskID);
  };
  return (
    <div className="tasks-page">
      <h1>Assigned Task</h1>
      <div className="content">
        {assignedTasks &&
          assignedTasks.map((task, index) => {
            if (task) {
              const taskId = task.id;
              return (
                <div key={index}>
                  <Card
                    id={taskId}
                    type="task"
                    title={task.title}
                    line1={task.created}
                    line2={task.dueDate}
                    cardClick={() => handleCardClick(taskId)}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        <Fab
          icon={faPlus}
          text="Task"
          onClick={() =>
            createATask(
              "608434c715859d3e4448303e",
              "Task Name",
              "Task Description"
            )
          }
        />
      </div>
    </div>
  );
};
