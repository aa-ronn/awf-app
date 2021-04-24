import axios from "axios";
import { FC, createContext, useState, useContext } from "react";
import { Project } from "../../models/project";
import { StoreContextType } from "../../types/store-context";
import { AuthContext } from "../auth/auth.context";

const StoreContext = createContext<StoreContextType>({
  projects: null,
  project: null,
  getAllProjects: async () => "",
  getASingleProject: async (id: string) => "",
  createAProject: async (title: string, description: string) => "",
  deleteAProject: async (id: string) => "",
  updateAProject: async (id: string, title?: string, description?: string) =>
    "",
});

const StoreProvider: FC = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  /**
   * Logs a user in based off input username and password.
   * @param email the users email
   * @param password the users password
   * @returns promise of success or failure
   */
  const getAllProjects = (): Promise<string> =>
    new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: "http://localhost:5000/projects",
        headers: {
          authorization: token,
        },
      })
        .then((res: any) => {
          console.log(res.data);
          let receivedProjects = new Array<Project>();

          for (let index = 0; index < res.data.projects.length; index++) {
            const proj = res.data.projects[index];

            receivedProjects.push(
              new Project(
                proj.id,
                proj.title,
                proj.description,
                null,
                null,
                proj.created
              )
            );
          }

          setProjects(receivedProjects);
        })
        .then(() => {
          resolve("Projects Received");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  /**
   * Logs a user in based off input username and password.
   * @param email the users email
   * @param password the users password
   * @returns promise of success or failure
   */
  const getASingleProject = (id: string): Promise<string> =>
    new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: "http://localhost:5000/projects/" + id,
        headers: {
          authorization: token,
        },
      })
        .then((res: any) => {
          console.log(res.data);
          const receivedProject = new Project(
            res.data.project.id,
            res.data.project.title,
            res.data.project.description,
            res.data.project.members,
            null,
            null
          );
          setProject(receivedProject);
        })
        .then(() => {
          resolve("Received Project");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  /**
   * Logs a user in based off input username and password.
   * @param email the users email
   * @param password the users password
   * @returns promise of success or failure
   */
  const createAProject = (
    title: string,
    description: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: "http://localhost:5000/projects",
        headers: {
          authorization: token,
        },
        data: {
          title: title,
          description: description,
        },
      })
        .then((res: any) => {
          console.log(res.data);
          if (projects) {
            setProjects([
              ...projects,
              new Project(
                res.data.project.id,
                res.data.project.title,
                res.data.project.description,
                null,
                null,
                null
              ),
            ]);
          } else {
            setProjects(
              new Array<Project>(
                new Project(
                  res.data.project.id,
                  res.data.project.title,
                  res.data.project.description,
                  null,
                  null,
                  null
                )
              )
            );
          }
        })
        .then(() => {
          resolve("Projects Created");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  /**
   * Deletes a specific project from list
   * @param id ID of selected project
   * @returns Promise of success or failuer
   */
  const deleteAProject = (id: string): Promise<string> =>
    new Promise((resolve, reject) => {
      axios({
        method: "delete",
        url: "http://localhost:5000/projects/" + id,
        headers: {
          authorization: token,
        },
      });
    });

  /**
   * Updates a single project title and/or description based on a project id, if a user
   * is currently authenticated.
   * @param id The id of the project to be updated.
   * @param title Optional - the new title value.
   * @param description Optional - the new description.
   * @returns Promise of success or failure.
   */
  const updateAProject = (
    id: string,
    title?: string,
    description?: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      if (!title && !description) {
        reject("No values provided to title and description");
      }

      let data: any = {};

      if (title && description) {
        data = { title: title, description: description };
      } else if (!title && description) {
        data = { description: description };
      } else if (!description && title) {
        data = { title: title };
      }

      axios({
        method: "put",
        url: "http://localhost:5000/projects/" + id,
        headers: {
          authorization: token,
        },
        data,
      })
        .then((res: any) => {
          console.log(res.data);
          const receivedProject = new Project(
            res.data.project.id,
            res.data.project.title,
            res.data.project.description,
            res.data.project.members,
            null,
            null
          );
          setProject(receivedProject);
        })
        .then(() => {
          resolve("Received Project");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  return (
    <StoreContext.Provider
      value={{
        projects,
        project,
        getAllProjects,
        getASingleProject,
        createAProject,
        deleteAProject,
        updateAProject,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
