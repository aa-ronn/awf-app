import { Fab } from "../../components/fab/fab.component";
import "./project.styles.scss";
import { faPlus, faMinus, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { StoreContext } from "../../context/store/store.context";
import { Card } from "../../components/card/card.component";
import { MemberCard } from "../../components/card/member-card/member-card.component";
import { useParams } from "react-router-dom";
import { Tooltip } from "../../components/tooltip/tooltip.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../../components/modal/modal.component";
import { Form } from "../../components/form/form.component";
import { Input } from "../../components/input/input.component";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

export const ProjectPage = () => {
  const {
    workingProject,
    createATask,
    deleteATask,
    getASingleProject,
    updateAProject,
    addMemberToAProject,
    deleteMemberFromAProject,
    addMemberToAProjectTask,
    updateATask,
    deleteMemberFromAProjectTask,
  } = useContext(StoreContext);
  const params = useParams<{ selectedProjectID: string }>();
  const [workingTaskId, setWorkingTaskId] = useState("");

  const initialTaskState = {
    selectOption: "",
    title: "",
    description: "",
    dueDate: "",
  };

  // Setting the first project as the default value
  // if (projects && projects.length > 0) {
  //   initialTaskState.selectOption = projects[0].id;
  // }

  const [addTaskState, setAddTaskState] = useState<{
    title: string;
    description: string;
    dueDate: string;
  }>(initialTaskState);

  const [editTaskState, setEditTaskState] = useState<{
    taskID: string;
    title: string;
    dueDate: string;
    description: string;
  }>({ taskID: "", title: "", dueDate: "", description: "" });

  useEffect(() => {
    if (!workingProject) {
      getASingleProject(params.selectedProjectID);
    }

    // eslint-disable-next-line
  }, []);

  const handleDeleteTaskCardClick = async (taskIndex: number) => {
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

  const handleFabClick = (type: string, id?: string) => {
    if (type === "member" && id) {
      setWorkingTaskId(id);
    }
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleEditTaskClick = (
    type: string,
    taskID: string,
    title: string,
    dueDate: string,
    description: string
  ) => {
    setEditTaskState({ taskID, title, dueDate, description });
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
    // eslint-disable-next-line
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
    if (modalType === "member" || modalType === "memberToProject") {
      if (name === "email") {
        setAddMemberState(value);
      }
    } else if (modalType === "edit-task") {
      setEditTaskState({ ...editTaskState, [name]: value });
    } else {
      const { value, name } = event.target;
      setAddTaskState({ ...addTaskState, [name]: value });
    }
  };

  const handleDeleteMemberFromTask = async (memberEmail: string) => {
    if (workingProject) {
      await deleteMemberFromAProjectTask(
        editTaskState.taskID,
        workingProject.id,
        memberEmail
      )
        .then((res) => {
          console.log("deleted member: ", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    if (workingProject) {
      if (modalType === "member") {
        await addMemberToAProjectTask(
          workingTaskId,
          workingProject.id,
          addMemberState
        )
          .then((res) => {
            console.log("added member to project task: ", res);
            setIsModalOpen(false);
            setIsLoading(false);
            setModalType("");
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      } else if (modalType === "memberToProject") {
        await addMemberToAProject(workingProject.id, addMemberState)
          .then((res) => {
            console.log("added member: ", res);
            setIsModalOpen(false);
            setIsLoading(false);
            setModalType("");
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      } else if (modalType === "edit-task") {
        await updateATask(
          editTaskState.taskID,
          workingProject.id,
          editTaskState.title,
          editTaskState.description,
          editTaskState.dueDate
        )
          .then((res) => {
            console.log("edit task: ", res);
            setIsModalOpen(false);
            setModalType("");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const { title, description, dueDate } = addTaskState;
        await createATask(workingProject.id, title, description, dueDate)
          .then((res) => {
            console.log("added task: ", res);
            setIsModalOpen(false);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      }
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <div className="project-page">
      {isModalOpen &&
        (modalType === "member" || modalType === "memberToProject") && (
          <Modal setModalOpen={setIsModalOpen}>
            <Form
              title={`Add a Member to ${
                modalType === "member" ? "Task" : "Project"
              }`}
              projectName={workingProject?.title}
              emoji="🦧"
              buttonLabel="Add Member"
              handleSubmit={handleFormSubmit}
              isLoading={isLoading}
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
            projectName={workingProject?.title}
            emoji="📖"
            buttonLabel="Add Task"
            handleSubmit={handleFormSubmit}
            isLoading={isLoading}
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
            <Input
              name="dueDate"
              label="Due Date"
              type="date"
              required
              handleChange={handleChange}
            />
            {/* <Select
              handleChange={handleChange}
              label="Project"
              list={[{ key: workingProject?.title, value: workingProject?.id }]}
            ></Select> */}
          </Form>
        </Modal>
      )}
      {isModalOpen && modalType === "edit-task" && (
        <Modal setModalOpen={setIsModalOpen}>
          <Form
            title="Edit Task"
            projectName={workingProject?.title}
            emoji="📖"
            buttonLabel="Edit Task"
            handleSubmit={handleFormSubmit}
            isLoading={isLoading}
          >
            <Input
              name="title"
              label="Title"
              type="text"
              placeholder="Enter title"
              required
              value={editTaskState.title}
              handleChange={handleChange}
            />
            <Input
              name="description"
              label="Description"
              type="text"
              placeholder="Enter description"
              value={editTaskState.description}
              required
              handleChange={handleChange}
            />
            <Input
              name="dueDate"
              label="Due Date"
              type="date"
              required
              value={editTaskState.dueDate}
              handleChange={handleChange}
            />
            <div className="members-title">
              <p>Members</p>
            </div>
            {workingProject &&
              workingProject.tasks &&
              workingProject.tasks.length > 0 &&
              workingProject.tasks
                .find((task) => task.id === editTaskState.taskID)
                ?.assigned_to?.map((user, index) => {
                  return (
                    <div key={index} className="members-list">
                      <p>{user.email}</p>
                      <button
                        type={"button"}
                        onClick={() => handleDeleteMemberFromTask(user.email)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  );
                })}
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
          <FontAwesomeIcon icon={faEdit} className="right-side-icon" />
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
          <FontAwesomeIcon icon={faEdit} className="right-side-icon" />
        </Tooltip>
      </div>

      <div className="content">
        <section className="project-tasks-section">
          <div className="title-and-button">
            <h2>Project Tasks</h2>
            <Tooltip
              text="Add a new task"
              position={width > 1200 ? "top" : "bottom"}
            >
              <button onClick={() => handleFabClick("task")}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Tooltip>
          </div>
          <div className="task-cards">
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
                    line2={task.due_date}
                    line3={task.description}
                    cardClick={() => handleDeleteTaskCardClick(index)}
                    addMembersClick={handleFabClick}
                    editTaskClick={handleEditTaskClick}
                  />
                );
              })
            ) : (
              <p>No tasks in this project</p>
            )}
          </div>
        </section>
        <section className="project-members-section">
          <div className="title-and-button">
            <h2>Project Members</h2>
            <Tooltip
              text="Add a new project member"
              position={width > 1200 ? "top" : "bottom"}
            >
              <button onClick={() => handleFabClick("memberToProject")}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Tooltip>
          </div>
          <div className="member-cards">
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
          </div>
        </section>

        <Fab icon={faPlus} text="Task" onClick={() => handleFabClick("task")} />
      </div>
    </div>
  );
};
