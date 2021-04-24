import { User } from "./user";

export class Task {
  id: string;
  title: string;
  description: string;
  created: string;
  dueDate: string;
  assignedTo: User[];

  constructor(
    id: string,
    title: string,
    description: string,
    created: string,
    dueDate: string,
    assignedTo: User[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.created = created;
    this.dueDate = dueDate;
    this.assignedTo = assignedTo;
  }
}
