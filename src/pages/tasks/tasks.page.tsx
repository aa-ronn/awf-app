import { Fab } from "../../components/fab/fab.component";
import "./tasks.styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { StoreContext } from "../../context/store/store.context";
import { Card } from "../../components/Card/card.component";

export const TasksPage = () => {
  const { tasks } = useContext(StoreContext);

  return (
    <div className="tasks-page">
      <div className="content">
        {tasks &&
          tasks.map((task, index) => {
            return (
              <div key={index}>
                <Card
                  id={task.id}
                  type="project"
                  title={task.title}
                  line1={task.created}
                  line2={task.description}
                />
              </div>
            );
          })}
        <Fab
          icon={faPlus}
          text="Task"
          onClick={() => console.log("fab clicked")}
        />
      </div>
    </div>
  );
};
