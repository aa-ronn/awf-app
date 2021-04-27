import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { StoreContext } from "../../context/store/store.context";
import { Fab } from "../../components/fab/fab.component";
import { Card } from "../../components/card/card.component";
import "./tasks.styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../components/modal/modal.component";
import { Form } from "../../components/form/form.component";
import { Input } from "../../components/input/input.component";
import { Select } from "../../components/select/select.component";

export const TasksPage = () => {
  const { assignedTasks, createATask, projects } = useContext(StoreContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialTaskState = {
    selectOption: "",
    title: "",
    description: "",
    dueDate: "",
  };

  // Setting the first project as the default value
  if (projects && projects.length > 0) {
    initialTaskState.selectOption = projects[0].id;
  }

  const [addTaskState, setAddTaskState] = useState<{
    selectOption: string;
    title: string;
    description: string;
    dueDate: string;
  }>(initialTaskState);

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setAddTaskState({ ...addTaskState, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const { selectOption, title, description, dueDate } = addTaskState;

    await createATask(selectOption, title, description, dueDate)
      .then((res) => {
        console.log("added task: ", res);
        setIsModalOpen(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="tasks-page">
      <h1>Assigned Task 📖</h1>
      {isModalOpen && (
        <Modal setModalOpen={setIsModalOpen}>
          <Form
            title="Add a Task"
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
      <div className="content">
        {assignedTasks &&
          assignedTasks.map((task, index) => {
            if (task) {
              const taskId = task.id;
              const projectId = task.projectID;
              return (
                <div key={index}>
                  <Card
                    id={taskId}
                    secondaryId={projectId}
                    type="task"
                    title={task.title}
                    line1={task.created}
                    line2={task.due_date}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        <Fab icon={faPlus} text="Task" onClick={() => setIsModalOpen(true)} />
      </div>
    </div>
  );
};
