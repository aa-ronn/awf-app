import { Fab } from "../../components/fab/fab.component";
import "./projects.styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { StoreContext } from "../../context/store/store.context";
import { Card } from "../../components/Card/card.component";
import { useHistory } from "react-router-dom";

export const ProjectsPage = () => {
  const { createAProject, getASingleProject, projects } = useContext(
    StoreContext
  );
  const history = useHistory();

  const handleCardClick = async (projectID: string) => {
    await getASingleProject(projectID);
    history.push("/projects/" + projectID);
  };

  return (
    <div className="projects-page">
      <h1>Your Projects</h1>
      <div className="content">
        {projects &&
          projects.map((project, index) => {
            return (
              <Card
                key={index}
                id={project.id}
                type="project"
                title={project.title}
                line1={project.created}
                line2={project.description}
                cardClick={() => handleCardClick(project.id)}
              />
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
