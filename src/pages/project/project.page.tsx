import { Fab } from "../../components/fab/fab.component";
import "./project.styles.scss";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StoreContext } from "../../context/store/store.context";
import { Card } from "../../components/Card/card.component";
import { MemberCard } from "../../components/Card/member-card/member-card.component";
import { useParams } from "react-router-dom";
import { Tooltip } from "../../components/tooltip/tooltip.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../../components/Modal/Modal.component";
import { Form } from "../../components/form/form.component";
import { Input } from "../../components/input/input.component";

export const ProjectPage = () => {
  const {
    workingProject,
    createATask,
    deleteATask,
    getASingleProject,
    updateAProject,
    addMemberToAProject,
    deleteMemberFromAProject,
  } = useContext(StoreContext);
  const params = useParams<{ selectedProjectID: string }>();

  useEffect(() => {
    if (!workingProject) {
      getASingleProject(params.selectedProjectID);
    }
    // eslint-disable-next-line
  }, []);

  const handleDeleteTaskCardClick = async (taskIndex: number) => {
    // await getASingleProject(projectID);
    workingProject &&
      workingProject.tasks &&
      (await deleteATask(
        workingProject.tasks[taskIndex].id,
        workingProject.id
      ).catch((err) => {
        console.log(err);
      }));
  };

  const handleDeleteMemberCardClick = async (memberIndex: number) => {
    workingProject &&
      workingProject.members &&
      (await deleteMemberFromAProject(
        workingProject.id,
        workingProject.members[memberIndex].email
      ).catch((err) => {
        console.log(err);
      }));
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
          updateAProject(
            workingProject.id,
            titleRef.current.innerText,
            undefined
          );
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
          updateAProject(
            workingProject.id,
            undefined,
            descriptionRef.current.innerText
          );
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMemberState, setAddMemberState] = useState("");

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    console.log(name);
    console.log(value);
    if (name === "email") {
      setAddMemberState(value);
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (workingProject) {
      await addMemberToAProject(workingProject.id, addMemberState)
        .then((res) => {
          console.log("added member: ", res);
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="project-page">
      {isModalOpen && (
        <Modal setModalOpen={setIsModalOpen}>
          <Form
            title="Add a Member"
            emoji="🦧"
            buttonLabel="Add Member"
            handleSubmit={handleFormSubmit}
          >
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="Enter email"
              required
              handleChange={handleChange}
            />
          </Form>
        </Modal>
      )}
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
                  line3={task.description}
                  cardClick={() => handleDeleteTaskCardClick(index)}
                />
              );
            })}
        </section>
        <section className="project-members-section">
          <div className="title-and-button">
            <h2>Project Members</h2>
            <button onClick={() => setIsModalOpen(true)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {workingProject &&
            workingProject.members &&
            workingProject.members.map((mem, index) => {
              return (
                <MemberCard
                  key={index}
                  email={mem.email}
                  firstName={mem.firstName}
                  lastName={mem.lastName}
                  cardClick={() => handleDeleteMemberCardClick(index)}
                />
              );
            })}
        </section>

        <Fab icon={faPlus} text="Task" onClick={() => handleFabClick()} />
      </div>
    </div>
  );
};
