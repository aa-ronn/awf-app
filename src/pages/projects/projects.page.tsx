import { ChangeEvent, FormEvent, useState } from "react";
import { Fab } from "../../components/fab/fab.component";
import "./projects.styles.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { StoreContext } from "../../context/store/store.context";
import { Card } from "../../components/card/card.component";
import { Modal } from "../../components/modal/modal.component";
import { Form } from "../../components/form/form.component";
import { Input } from "../../components/input/input.component";
import { useHistory } from "react-router-dom";

export const ProjectsPage = () => {
  const { createAProject, getASingleProject, projects } = useContext(
    StoreContext
  );
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addProjectState, setAddProjectState] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });

  const handleCardClick = async (projectID: string) => {
    await getASingleProject(projectID);
    history.push("/projects/" + projectID);
  };

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setAddProjectState({ ...addProjectState, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const { title, description } = addProjectState;

    await createAProject(title, description)
      .then((res) => {
        console.log("added project: ", res);
        setIsModalOpen(false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        console.log("error adding project");
      });
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="projects-page">
      <h1>Your Projects 📓</h1>
      {isModalOpen && (
        <Modal setModalOpen={setIsModalOpen}>
          <Form
            title="Add a Project"
            emoji="📓"
            buttonLabel="Add Project"
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
          </Form>
        </Modal>
      )}
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
          onClick={() => setIsModalOpen(true)}
        />
      </div>
    </div>
  );
};
