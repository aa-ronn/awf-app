import { Project } from "../models/project";

export type StoreContextType = {
  projects: Project[] | null;
  project: Project | null;
  getAllProjects: () => Promise<string>;
  getASingleProject: (id: string) => Promise<string>;
  createAProject: (title: string, description: string, startDate:string) => Promise<string>;
  deleteAProject: (id: string) => Promise<string>;
};
