import { Project } from "../models/project";
import { Task } from "../models/task";

export type StoreContextType = {
  projects: Project[] | null;
  workingProject: Project | null;
  assignedTasks: Task[] | null;
  workingTask: Task | null;
  getASingleProject: (id: string) => Promise<string>;
  createAProject: (title: string, description: string) => Promise<string>;
  deleteAProject: (id: string) => Promise<string>;
  updateAProject: (
    id: string,
    title?: string,
    description?: string
  ) => Promise<string>;
  createATask: (
    projectId: string,
    title: string,
    description: string,
    dueDate?: string
  ) => Promise<string>;
  updateATask: (
    taskId: string,
    projectId: string,
    title: string,
    description: string,
    dueDate?: string
  ) => Promise<string>;
  deleteATask: (taskId: string, projectId: string) => Promise<string>;
};
