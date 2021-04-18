export type AuthContextType = {
  token: string | null;
  user: User | null;
  signUpWithEmailAndPassword: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<string>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<string>;
  signOut: () => void;
};

export class User {
  firstName: string;
  lastName: string;
  email: string;

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
