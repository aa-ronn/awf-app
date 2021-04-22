import { Fab } from "../../components/fab/fab.component";
import "./tasks.styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const TasksPage = () => {
  return (
    <div className="tasks-page">
      <div className="content">
        <Fab
          icon={faPlus}
          text="Task"
          onClick={() => console.log("fab clicked")}
        />
      </div>
    </div>
  );
};
