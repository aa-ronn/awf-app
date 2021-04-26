import { User } from "./user";

export class Task {
  id: string;
  projectID: string;
  title: string;
  description: string;
  dueDate: string;
  assigned_to: User[] | null | undefined;
  created: string | null;

  constructor(
    id: string,
    projectID: string,
    title: string,
    description: string,
    dueDate: string,
    assigned_to: User[] | null | undefined,
    created: string | null
  ) {
    this.id = id;
    this.projectID = projectID;
    this.title = title;
    this.description = description;
    this.created = created;
    this.dueDate = dueDate;
    this.assigned_to = assigned_to;
  }
}
