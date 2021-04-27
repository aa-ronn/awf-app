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

import { host } from "../../utils/env";
import { ToastContext } from "../toast/toast.context";

const StoreContext = createContext<StoreContextType>({
  projects: null,
  workingProject: null,
  assignedTasks: null,
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
  updateATask: async (
    taskId: string,
    projectId: string,
    title: string,
    description: string,
    dueDate?: string
  ) => "",
  deleteATask: async (ttaskId: string, projectId: string) => "",
  addMemberToAProject: async (projectId: string, memberEmail: string) => "",
  deleteMemberFromAProject: async (projectId: string, memberEmail: string) =>
    "",
  addMemberToAProjectTask: async (
    taskId: string,
    projectId: string,
    memberEmail: string
  ) => "",
  deleteMemberFromAProjectTask: async (
    taskId: string,
    projectId: string,
    memberEmail: string
  ) => "",
});

const StoreProvider: FC = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [workingProject, setWorkingProject] = useState<Project | null>(null);
  const [assignedTasks, setAssignedTasks] = useState<Task[] | null>(null);
  const { notify } = useContext(ToastContext);

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
          url: host + "/projects",
          headers: {
            authorization: token,
          },
        })
          .then((res: any) => {
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
            notify(err.message, "error");
            reject(err);
          });
      }),
    [token, notify]
  );

  /**
   * Gets a single project based off it's id, if the user is authenticated.
   * @public
   * @param id The id of the post to fetch.
   * @returns Promise of success or failure
   */
  const getASingleProject = (id: string): Promise<string> =>
    new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: host + "/projects/" + id,
        headers: {
          authorization: token,
        },
      })
        .then((res: any) => {
          const memberList: User[] = [...res.data.project.members];
          const taskList: Task[] = [...res.data.project.tasks];

          setWorkingProject(
            new Project(
              res.data.project.id,
              res.data.project.title,
              res.data.project.description,
              memberList,
              taskList,
              res.data.project.created
            )
          );
        })
        .then(() => {
          resolve("Project Details Received");
        })
        .catch((err) => {
          notify(err.message, "error");
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
  const createAProject = (
    title: string,
    description: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: host + "/projects",
        headers: {
          authorization: token,
        },
        data: {
          title: title,
          description: description,
        },
      })
        .then((res: any) => {
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
          notify("Project Created");
          resolve("Project Created");
        })
        .catch((err) => {
          notify(err.message, "error");
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
        url: host + "/projects/" + id,
        headers: {
          authorization: token,
        },
      })
        .then(async () => {
          await getAllProjects();
          await getAllTasksAssignedToAUser();
        })
        .then(() => {
          notify("Project Deleted");
          resolve("Deleted Project");
        })
        .catch((err) => {
          notify(err.message, "error");
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
        url: host + "/projects/" + id,
        headers: {
          authorization: token,
        },
        data,
      })
        .then((res: any) => {
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
          await getASingleProject(id);
        })
        .then(async () => {
          await getAllProjects();
        })
        .then(() => {
          notify("Project Updated");
          resolve("Updated Project");
        })
        .catch((err) => {
          notify(err.message, "error");
          reject(err);
        });
    });

  /**
   * Adds a new member to a specified project, if the user is authenticated.
   * @public
   * @param projectId ID of selected project
   * @param memberEmail The email of the invited member.
   * @returns Promise of success or failuer
   */
  const addMemberToAProject = (
    projectId: string,
    memberEmail: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      if (!projectId || !memberEmail) {
        reject("A project ID and an email must be provided");
      }
      axios({
        method: "post",
        url: host + `/projects/${projectId}/members`,
        headers: {
          authorization: token,
        },
        data: {
          email: memberEmail,
        },
      })
        .then(async () => {
          await getASingleProject(projectId);
        })
        .then(() => {
          notify("Member Added To Project");
          resolve("Member Added To Project");
        })
        .catch((err) => {
          notify(err.message, "error");
          reject(err);
        });
    });

  /**
   * Adds a new member to a specified project, if the user is authenticated.
   * @public
   * @param projectId ID of selected project
   * @param memberEmail The email of the invited member.
   * @returns Promise of success or failuer
   */
  const deleteMemberFromAProject = (
    projectId: string,
    memberEmail: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      if (!projectId || !memberEmail) {
        reject("A project ID and an email must be provided");
      }
      axios({
        method: "delete",
        url: host + `/projects/${projectId}/members`,
        headers: {
          authorization: token,
        },
        data: {
          email: memberEmail,
        },
      })
        .then(async () => {
          await getASingleProject(projectId);
        })
        .then(() => {
          notify("Member Deleted From Project");
          resolve("Member Deleted From Project");
        })
        .catch((err) => {
          notify(err.message, "error");
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
      url: host + "/tasks",
      headers: {
        authorization: token,
      },
    })
      .then((res: any) => {
        let receivedTasks = new Array<Task>();

        for (let index = 0; index < res.data.tasks.length; index++) {
          const task = res.data.tasks[index];

          receivedTasks.push(
            new Task(
              task.id,
              task.project_id,
              task.title,
              task.description,
              task.due_date,
              task.assigned_To,
              task.created
            )
          );
        }
        setAssignedTasks(receivedTasks);
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        notify(err.message, "error");
        console.log(err);
        return false;
      });
  }, [token, notify]);

  /**
   * Creates a new task associated with a specified project.
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
      if (!projectId && !title && !description && !dueDate) {
        reject(
          "No values provided to projectId, title, description, or due date"
        );
      }
      if (!projectId || !title || !description) {
        reject("A projectId, title, and description must be provided");
      }

      let data: any = {};
      if (!dueDate) {
        data = { title: title, description: description };
      } else {
        data = { title: title, description: description, due_date: dueDate };
      }

      axios({
        method: "post",
        url: host + `/projects/${projectId}/tasks`,
        headers: {
          authorization: token,
        },
        data,
      })
        .then(async (res: any) => {
          await getAllTasksAssignedToAUser();
        })
        .then(async () => {
          await getASingleProject(projectId);
        })
        .then(() => {
          notify("Task Created");
          resolve("Task Created");
        })
        .catch((err) => {
          notify(err.message, "error");
          reject(err);
        });
    });

  /**
   * Updates a specific task from a specified project, if the user to authenticated.
   * @public
   * @param taskId The task to be updated.
   * @param projectId The project that contains the task.
   * @param title Optional - The new title for the task.
   * @param description Optional - The new description for the task.
   * @param dueDate Optional - The new due date for the task.
   * @returns Promise of success or failure
   */
  const updateATask = (
    taskId: string,
    projectId: string,
    title: string,
    description: string,
    dueDate?: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      if (!title && !description && !dueDate) {
        reject("No values provided to title, description, or due date");
      }

      let data: any = {};

      if (title && description && dueDate) {
        data = { title: title, description: description, due_date: dueDate };
      } else if (!title && description && dueDate) {
        data = { description: description, due_date: dueDate };
      } else if (!description && title && dueDate) {
        data = { title: title, due_date: dueDate };
      } else if (!description && !title && dueDate) {
        data = { due_date: dueDate };
      } else if (!description && !title && dueDate) {
        data = { due_date: dueDate };
      } else if (!description && title && !dueDate) {
        data = { title: title };
      } else if (description && !title && !dueDate) {
        data = { description: description };
      }

      axios({
        method: "put",
        url: host + `/projects/${projectId}/tasks/${taskId}`,
        headers: {
          authorization: token,
        },
        data,
      })
        .then(async () => {
          await getASingleProject(projectId);
        })
        .then(() => {
          notify("Task Updated");
          resolve("Task Updated");
        })
        .catch((err) => {
          notify(err.message, "error");
          reject(err);
        });
    });

  /**
   * Deletes a specific task from a specified project, if the user to authenticated.
   * @public
   * @param taskId The task to be deleeted.
   * @param projectId The project that contains the task.
   * @returns Promise of success or failure
   */
  const deleteATask = (taskId: string, projectId: string): Promise<string> =>
    new Promise((resolve, reject) => {
      console.log("deleting task...");
      axios({
        method: "delete",
        url: host + `/projects/${projectId}/tasks/${taskId}`,
        headers: {
          authorization: token,
        },
      })
        .then(async () => {
          await getASingleProject(projectId);
          await getAllTasksAssignedToAUser();
        })
        .then(() => {
          notify("Task Deleted");
          resolve("Task Deleted");
        })
        .catch((err) => {
          notify(err.message, "error");
          reject(err);
        });
    });

  /**
   * Adds a new member to a specified project, if the user is authenticated.
   * @public
   * @param projectId ID of selected project
   * @param memberEmail The email of the invited member.
   * @returns Promise of success or failure
   */
  const addMemberToAProjectTask = (
    taskId: string,
    projectId: string,
    memberEmail: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      if (!projectId || !memberEmail) {
        reject("A task ID, project ID and an email must be provided");
      }

      axios({
        method: "post",
        url: host + `/projects/${projectId}/tasks/${taskId}/assigned`,
        headers: {
          authorization: token,
        },
        data: {
          email: memberEmail,
        },
      })
        .then(async () => {
          await getASingleProject(projectId);
        })
        .then(() => {
          notify("Member Added To Project Task");
          resolve("Member Added To Project Task");
        })
        .catch((err) => {
          notify(err.message, "error");
          reject(err);
        });
    });

  /**
   * Adds a new member to a specified project, if the user is authenticated.
   * @public
   * @param projectId ID of selected project
   * @param memberEmail The email of the invited member.
   * @returns Promise of success or failuer
   */
  const deleteMemberFromAProjectTask = (
    taskId: string,
    projectId: string,
    memberEmail: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      if (!projectId || !memberEmail) {
        reject("A task ID, project ID and an email must be provided");
      }
      axios({
        method: "delete",
        url: host + `/projects/${projectId}/tasks/${taskId}/assigned`,
        headers: {
          authorization: token,
        },
        data: {
          email: memberEmail,
        },
      })
        .then(async () => {
          await getASingleProject(projectId);
        })
        .then(() => {
          notify("Member Deleted From Project Task");
          resolve("Member Deleted From Project Task");
        })
        .catch((err) => {
          notify(err.message, "error");
          reject(err);
        });
    });

  //**----------------**//
  //** GLOBAL SECTION **//
  //**----------------**//

  useEffect(() => {
    if (token) {
      getAllProjects();
      getAllTasksAssignedToAUser();
    }
  }, [getAllProjects, getAllTasksAssignedToAUser, token]);

  useEffect(() => {
    if (token) {
      getAllTasksAssignedToAUser();
    }
  }, [workingProject, getAllTasksAssignedToAUser, token]);
  return (
    <StoreContext.Provider
      value={{
        projects,
        workingProject,
        assignedTasks,
        getASingleProject,
        createAProject,
        deleteAProject,
        updateAProject,
        createATask,
        deleteATask,
        updateATask,
        addMemberToAProject,
        deleteMemberFromAProject,
        addMemberToAProjectTask,
        deleteMemberFromAProjectTask,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
