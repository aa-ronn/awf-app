import { User } from "../models/user";

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
