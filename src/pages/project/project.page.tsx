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
import { Select } from "../../components/Select/select.component";

export const ProjectPage = () => {
  const {
    workingProject,
    projects,
    createATask,
    deleteATask,
    getASingleProject,
    updateAProject,
    addMemberToAProject,
    deleteMemberFromAProject,
  } = useContext(StoreContext);
  const params = useParams<{ selectedProjectID: string }>();

  const initialTaskState = { selectOption: "", title: "", description: "" };

  // Setting the first project as the default value
  // if (projects && projects.length > 0) {
  //   initialTaskState.selectOption = projects[0].id;
  // }

  const [addTaskState, setAddTaskState] = useState<{
    selectOption: string;
    title: string;
    description: string;
  }>(initialTaskState);

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

  const handleFabClick = async (type: string) => {
    // workingProject &&
    //   workingProject.tasks &&
    //   (await createATask(
    //     workingProject.id,
    //     "Task Name " + workingProject.tasks.length,
    //     "Task Description " + workingProject.tasks.length
    //   ));

    setModalType(type);
    setIsModalOpen(true);
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
  const [modalType, setModalType] = useState("");
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
    if (modalType === "member") {
      if (name === "email") {
        setAddMemberState(value);
      }
    } else {
      const { value, name } = event.target;
      setAddTaskState({ ...addTaskState, [name]: value });
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (workingProject) {
      if (modalType === "member") {
        await addMemberToAProject(workingProject.id, addMemberState)
          .then((res) => {
            console.log("added member: ", res);
            setIsModalOpen(false);
            setModalType("");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const { selectOption, title, description } = addTaskState;
        await createATask(selectOption, title, description)
          .then((res) => {
            console.log("added task: ", res);
            setIsModalOpen(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div className="project-page">
      {isModalOpen && modalType === "member" && (
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
      {isModalOpen && modalType === "task" && (
        <Modal setModalOpen={setIsModalOpen}>
          <Form
            title="Add a Task"
            emoji="📖"
            buttonLabel="Add Task"
            handleSubmit={handleFormSubmit}
          >
            <Input
              name="title"
              label="Title"
              type="text"
              placeholder="Enter title"
              required
              handleChange={handleChange}
            />
            <Input
              name="description"
              label="Description"
              type="text"
              placeholder="Enter description"
              required
              handleChange={handleChange}
            />
            <Select
              handleChange={handleChange}
              label="Project"
              list={projects?.map((project) => {
                return { key: project.title, value: project.id };
              })}
            ></Select>
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
            <button onClick={() => handleFabClick("task")}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {workingProject &&
          workingProject.tasks &&
          workingProject.tasks.length > 0 ? (
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
            })
          ) : (
            <p>No tasks in this project</p>
          )}
        </section>
        <section className="project-members-section">
          <div className="title-and-button">
            <h2>Project Members</h2>

            <button onClick={() => handleFabClick("member")}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {workingProject && workingProject.members ? (
            workingProject.members.map((member, index) => {
              return (
                <MemberCard
                  key={index}
                  email={member.email}
                  firstName={member.firstName}
                  lastName={member.lastName}
                  cardClick={() => handleDeleteMemberCardClick(index)}
                />
              );
            })
          ) : (
            <p>No members in this project</p>
          )}
        </section>

        <Fab icon={faPlus} text="Task" onClick={() => handleFabClick("task")} />
      </div>
    </div>
  );
};
