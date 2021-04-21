import { Fab } from "../../components/fab/fab.component";
import "./projects.styles.scss";

export const ProjectsPage = () => {
  return (
    <div className="projects-page">
      <div className="content">
        <Fab
          icon="+"
          text="Project"
          onClick={() => console.log("fab clicked")}
        ></Fab>
      </div>
    </div>
  );
};
