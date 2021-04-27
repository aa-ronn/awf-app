import axios from "axios";
import { FC, createContext, useState } from "react";
import { AuthContextType } from "../../types/auth-context";
import { User } from "../../models/user";
import { host } from "../../utils/env";

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  signUpWithEmailAndPassword: async () => "",
  signInWithEmailAndPassword: async () => "",
  signOut: () => {},
});

const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  /**
   * Signs up new a user..
   * @param firstName the users first name
   * @param lastName the users last name
   * @param email the users email
   * @param password the users password
   * @returns promise of success or failure
   */
  const signUpWithEmailAndPassword = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: host + "/auth/register",
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
      })
        .then((res: any) => {
          setToken(res.data.token);
          setUser(res.data.user);
        })
        .then(() => {
          resolve("User created");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  /**
   * Logs a user in based off input username and password.
   * @param email the users email
   * @param password the users password
   * @returns promise of success or failure
   */
  const signInWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<string> =>
    new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: host + "/auth/login",
        data: {
          email: email,
          password: password,
        },
      })
        .then((res: any) => {
          setToken(res.data.token);
          setUser(res.data.user);
        })
        .then(() => {
          resolve("User Loged In");
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });

  /**
   * Signs out the current user.
   * @param none
   * @returns none
   */
  const signOut = () => {
    setToken(null);
    setUser(null);
    console.log("Signed Out");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
