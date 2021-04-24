import { Project } from "../models/project";

export type StoreContextType = {
  projects: Project[] | null;
  project: Project | null;
  getASingleProject: (id: string) => Promise<string>;
  createAProject: (title: string, description: string) => Promise<string>;
  deleteAProject: (id: string) => Promise<string>;
  updateAProject: (
    id: string,
    title?: string,
    description?: string
  ) => Promise<string>;
};
