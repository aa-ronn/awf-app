import { Fab } from "../../components/fab/fab.component";
import "./project.styles.scss";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/store/store.context";
import { Card } from "../../components/Card/card.component";
import { useParams } from "react-router-dom";
import { Tooltip } from "../../components/tooltip/tooltip.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ProjectPage = () => {
  const { workingProject, createATask, getASingleProject } = useContext(
    StoreContext
  );
  const params = useParams<{ selectedProjectID: string }>();

  useEffect(() => {
    if (!workingProject) {
      getASingleProject(params.selectedProjectID);
    }
    // eslint-disable-next-line
  }, []);

  const handleCardClick = async (taskIndex: number) => {
    // await getASingleProject(projectID);
    workingProject &&
      workingProject.tasks &&
      console.log(workingProject.tasks[taskIndex]);
  };

  const handleFabClick = async () => {
    workingProject &&
      workingProject.tasks &&
      (await createATask(
        workingProject.id,
        "Task Name " + workingProject.tasks.length,
        "Task Description " + workingProject.tasks.length
      ));
  };

  return (
    <div className="project-page">
      <div className="title-details">
        <Tooltip text="Click to edit">
          <h1 className="editable-on-click">
            {workingProject && workingProject.title}
          </h1>
          <FontAwesomeIcon icon={faEdit} />
        </Tooltip>
        <Tooltip text="Click to edit">
          <p className="editable-on-click">
            {workingProject && workingProject.description}
          </p>
          <FontAwesomeIcon icon={faEdit} />
        </Tooltip>
      </div>

      <div className="content">
        <section className="project-tasks-section">
          <div className="title-and-button">
            <h2>Project Tasks</h2>
            <button>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {workingProject &&
            workingProject.tasks &&
            workingProject.tasks.map((task, index) => {
              return (
                <Card
                  key={index}
                  id={task.id}
                  type="task"
                  title={task.title}
                  line1={task.created}
                  line2={task.description}
                  cardClick={() => handleCardClick(index)}
                />
              );
            })}
        </section>
        <section className="project-members-section">
          <div className="title-and-button">
            <h2>Project Members</h2>
            <button>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </section>

        <Fab icon={faPlus} text="Task" onClick={() => handleFabClick()} />
      </div>
    </div>
  );
};
