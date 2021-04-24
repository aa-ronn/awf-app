import axios from "axios";
import {
  FC,
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Project } from "../../models/project";
import { Task } from "../../models/task";
import { User } from "../../models/user";
import { StoreContextType } from "../../types/store-context";
import { AuthContext } from "../auth/auth.context";

const StoreContext = createContext<StoreContextType>({
  projects: null,
  workingProject: null,
  tasks: null,
  workingTask: null,
  getASingleProject: async (id: string) => "",
  createAProject: async (title: string, description: string) => "",
  deleteAProject: async (id: string) => "",
  updateAProject: async (id: string, title?: string, description?: string) =>
    "",
  createATask: async (
    projectId: string,
    title: string,
    description: string,
    dueDate?: string
  ) => "",
});

const StoreProvider: FC = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [workingProject, setWorkingProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [workingTask, setWorkingTask] = useState<Task | null>(null);

  /**
   * Gets all projects for the currently authenticated user. Called from
   * within the provider only.
   * @private
   * @returns Promise of success or failure
   */
  const getAllProjects = useCallback(
    (): Promise<string> =>
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
                  proj.members,
                  proj.tasks,
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
      }),
    [token]
  );

  /**
   * Gets a single project based off it's id, if the user is authenticated.
   * @public
   * @param id The id of the post to fetch.
   * @returns Promise of success or failure
   */
  const getASingleProject = (id: string): Promise<string> =>
    new Promise((resolve, reject) => {
      if (projects) {
        const foundProjectID = findWithAttr(projects, "id", id);

        if (foundProjectID >= 0) {
          setWorkingProject(projects[foundProjectID]);
        } else {
          reject("No Project With That ID Was Found");
        }
      } else {
        reject("No Projects Found");
      }
      getAllTasksAssignedToAProject(id).then((result) => {
        if (result) {
          resolve("Project Found");
        } else {
          resolve("Unable To Get Project Tasks");
        }
      });
    });

  /**
   * Creates a new project associated with the currently logged in user.
   * @public
   * @param title The title of the new post.
   * @param description The description of the new post.
   * @returns Promise of success or failure
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
                new Array<User>(),
                new Array<Task>(),
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
                  new Array<User>(),
                  new Array<Task>(),
                  null
                )
              )
            );
          }
        })
        .then(async () => {
          await getAllProjects();
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
   * @public
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
      })
        .then(() => {
          getAllProjects();
        })
        .then(() => {
          resolve("Deleted Project");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  /**
   * Updates a single project title and/or description based on a project id, if a user
   * is currently authenticated.
   * @public
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
            res.data.project.tasks,
            res.data.project.created
          );
          setWorkingProject(receivedProject);
        })
        .then(async () => {
          await getAllProjects();
        })
        .then(() => {
          resolve("Updated Project");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  //!!---------------!!//
  //!! TASKS SECTION !!//
  //!!---------------!!//

  /**
   * Gets all tasks for the currently authenticated user. Called from
   * within the provider only.
   * @private
   * @returns Promise of success or failure
   */
  const getAllTasksAssignedToAUser = useCallback(async () => {
    await axios({
      method: "get",
      url: "http://localhost:5000/tasks",
      headers: {
        authorization: token,
      },
    })
      .then((res: any) => {
        console.log(res.data);
        let receivedTasks = new Array<Task>();

        for (let index = 0; index < res.data.tasks.length; index++) {
          const task = res.data.tasks[index];

          receivedTasks.push(
            new Task(
              task.task_id,
              task.project_id,
              task.title,
              task.description,
              task.due_date,
              task.assignedTo,
              task.created
            )
          );
        }
        setTasks(receivedTasks);
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }, [token]);

  /**
   * Gets a single task based off it's id , if the user is authenticated.
   * @public
   * @param id The id of the post to fetch.
   * @returns Promise of success or failure
   */
  const getAllTasksAssignedToAProject = (projectId: string): Promise<string> =>
    new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: `http://localhost:5000/${projectId}/tasks`,
        headers: {
          authorization: token,
        },
      })
        .then((res: any) => {
          console.log(res.data);
          let receivedTasks = new Array<Task>();

          if (projects) {
            const foundProjectID = findWithAttr(projects, "id", projectId);
            projects[foundProjectID].tasks = [...receivedTasks];
            if (foundProjectID >= 0) {
              setProjects([...projects]);
              setWorkingProject(projects[foundProjectID]);
            } else {
              reject("No Project With That ID Was Found");
            }
          } else {
            reject("No Projects Found");
          }
          setTasks(receivedTasks);
        })
        .then(() => {
          resolve("Tasks Received");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  /**
   * Creates a new project associated with the currently logged in user.
   * @public
   * @param title The title of the new post.
   * @param description The description of the new post.
   * @returns Promise of success or failure
   */
  const createATask = (
    projectId: string,
    title: string,
    description: string,
    dueDate?: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      let data: any = {};
      if (!dueDate) {
        data = { title: title, description: description };
      } else {
        data = { title: title, description: description, due_date: dueDate };
      }

      axios({
        method: "post",
        url: `http://localhost:5000/projects/${projectId}/tasks`,
        headers: {
          authorization: token,
        },
        data,
      })
        .then((res: any) => {
          console.log(res.data);
          // if (projects) {
          //   setProjects([
          //     ...projects,
          //     new Project(
          //       res.data.project.id,
          //       res.data.project.title,
          //       res.data.project.description,
          //       null,
          //       null,
          //       null
          //     ),
          //   ]);
          // } else {
          //   setProjects(
          //     new Array<Project>(
          //       new Project(
          //         res.data.project.id,
          //         res.data.project.title,
          //         res.data.project.description,
          //         null,
          //         null,
          //         null
          //       )
          //     )
          //   );
          // }
        })
        .then(async () => {
          await getAllProjects();
        })
        .then(() => {
          resolve("Task Created");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  //**----------------**//
  //** GLOBAL SECTION **//
  //**----------------**//

  const findWithAttr = (array: any, attr: any, value: any) => {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  };

  useEffect(() => {
    getAllProjects();
    getAllTasksAssignedToAUser();
  }, [getAllProjects, getAllTasksAssignedToAUser]);

  return (
    <StoreContext.Provider
      value={{
        projects,
        workingProject,
        tasks,
        workingTask,
        getASingleProject,
        createAProject,
        deleteAProject,
        updateAProject,
        createATask,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
