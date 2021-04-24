import { Fab } from "../../components/fab/fab.component";
import "./projects.styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/store/store.context";

export const ProjectsPage = () => {
  const {
    getAllProjects,
    createAProject,
    getASingleProject,
    projects,
  } = useContext(StoreContext);

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="projects-page">
      <div className="content">
        {projects &&
          projects.map((project) => {
            return (
              <p key={project.id} onClick={() => getASingleProject(project.id)}>
                {project.title}
              </p>
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
