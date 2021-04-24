import { User } from "./user";

export class Assignee {
  id: string;
  ref: User;

  constructor(id: string, ref: User) {
    this.id = id;
    this.ref = ref;
  }
}
