import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Form } from "../../components/form/form.component";
import { Input } from "../../components/input/input.component";
import { AuthContext } from "../../context/auth/auth.context";
import "./signin-signup.styles.scss";

export const SignInSignUpPage = () => {
  const { signUpWithEmailAndPassword, signInWithEmailAndPassword } = useContext(
    AuthContext
  );

  const [signInState, setSignInState] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    console.log(value + ":" + name);
    setSignInState({ ...signInState, [name]: value });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("form submitted");
  };

  return (
    <div className="signin-signup-page">
      <div className="login-wrapper">
        <Form
          title="Please Log In"
          emoji="🤓"
          buttonLabel="Log In"
          handleSubmit={handleFormSubmit}
        >
          <Input
            name="email"
            label="Email"
            type="text"
            placeholder="Enter email"
            emoji="📧"
            handleChange={handleChange}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            emoji="🔑"
            handleChange={handleChange}
          />
        </Form>
      </div>
    </div>
  );
};
