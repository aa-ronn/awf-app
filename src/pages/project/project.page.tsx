import { Fab } from "../../components/fab/fab.component";
import "./project.styles.scss";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { MutableRefObject, useContext, useEffect, useRef } from "react";
import { StoreContext } from "../../context/store/store.context";
import { Card } from "../../components/Card/card.component";
import { MemberCard } from "../../components/Card/member-card/member-card.component";
import { useParams } from "react-router-dom";
import { Tooltip } from "../../components/tooltip/tooltip.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ProjectPage = () => {
  const {
    workingProject,
    createATask,
    getASingleProject,
    updateAProject,
  } = useContext(StoreContext);
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

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    let titleEditCapture: HTMLHeadingElement;
    let descriptionEditCapture: HTMLParagraphElement;
    const finishEditTitle = () => {
      if (workingProject) {
        if (titleRef && titleRef.current) {
          updateAProject(workingProject.id, titleRef.current.innerText);
        }
      }
    };
    if (titleRef && titleRef.current) {
      titleEditCapture = titleRef.current;

      titleEditCapture.addEventListener("focusout", finishEditTitle);
    }
    const finishEditDescription = () => {
      if (workingProject) {
        if (descriptionRef && descriptionRef.current) {
          updateAProject(workingProject.id, descriptionRef.current.innerText);
        }
      }
    };
    if (descriptionRef && descriptionRef.current) {
      descriptionEditCapture = descriptionRef.current;

      descriptionEditCapture.addEventListener(
        "focusout",
        finishEditDescription
      );
    }

    return () => {
      titleEditCapture.addEventListener("focusout", finishEditTitle);
      descriptionEditCapture.addEventListener(
        "focusout",
        finishEditDescription
      );
    };
  }, []);

  return (
    <div className="project-page">
      <div className="title-details">
        <Tooltip text="Click to edit">
          <h1
            className="editable-on-click"
            contentEditable="true"
            suppressContentEditableWarning={true}
            ref={titleRef}
          >
            {workingProject && workingProject.title}
          </h1>
          <FontAwesomeIcon icon={faEdit} />
        </Tooltip>
        <Tooltip text="Click to edit">
          <p
            className="editable-on-click"
            contentEditable="true"
            suppressContentEditableWarning={true}
            ref={descriptionRef}
          >
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
                  secondaryId={workingProject.id}
                  type="task"
                  title={task.title}
                  line1={task.created}
                  line2={task.dueDate}
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
          {workingProject &&
            workingProject.tasks &&
            workingProject.tasks.map((task, index) => {
              return (
                <div>
                  <div className="member-card">
                    <MemberCard
                      key={index}
                      email="john@email.com"
                      firstName="John"
                      lastName="Stanley"
                      //cardClick={() => handleCardClick(index)}
                    />
                  </div>
                </div>
              );
            })}
        </section>

        <Fab icon={faPlus} text="Task" onClick={() => handleFabClick()} />
      </div>
    </div>
  );
};
