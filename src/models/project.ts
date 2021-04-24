import { Task } from "./task";
import { User } from "./user";

export class Project {
  id: string;
  title: string;
  description: string;
  members: User[] | null;
  tasks: Task[] | null;
  created: string | null;

  constructor(
    id: string,
    title: string,
    description: string,
    members: User[] | null,
    tasks: Task[] | null,
    created: string | null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.members = members;
    this.tasks = tasks;
    this.created = created;
  }
}
