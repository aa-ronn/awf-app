import { useContext } from "react";
import { StoreContext } from "../../context/store/store.context";
import { Fab } from "../../components/fab/fab.component";
import { Card } from "../../components/Card/card.component";
import "./tasks.styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const TasksPage = () => {
  const { projects } = useContext(StoreContext);
  return (
    <div className="tasks-page">
      <div className="content">
        {projects &&
          projects.map((project, index) => {
            return (
              <div key={index}>
                <Card
                  id={project.id}
                  type="task"
                  title={project.title}
                  line1={project.created}
                  line2={project.description}
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
