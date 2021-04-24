import { Fab } from "../../components/fab/fab.component";
import "./projects.styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { StoreContext } from "../../context/store/store.context";
import { Card } from "../../components/Card/card.component";

export const ProjectsPage = () => {
  const { createAProject, projects } = useContext(StoreContext);

  return (
    <div className="projects-page">
      <div className="content">
        {projects &&
          projects.map((project, index) => {
            return (
              <div key={index}>
                <Card
                  id={project.id}
                  type="project"
                  title={project.title}
                  line1={project.created}
                  line2={project.description}
                />
              </div>
            );
          })}
        <Fab
          icon={faPlus}
          text="Project"
          onClick={() =>
            createAProject(
              "Test Project " + projects?.length.toString(),
              "Test Description " + projects?.length.toString()
            )
          }
        />
      </div>
    </div>
  );
};
