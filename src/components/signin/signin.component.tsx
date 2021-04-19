import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Form } from "../../components/form/form.component";
import { Input } from "../../components/input/input.component";
import { AuthContext } from "../../context/auth/auth.context";
import "./signin.styles.scss";

export const SignIn = () => {
  const { signInWithEmailAndPassword } = useContext(AuthContext);

  const [signInState, setSignInState] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setSignInState({ ...signInState, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = signInState;

    setIsLoading(true);
    await signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="signin-component">
      <Form
        title="Please Log In"
        emoji="🦧"
        buttonLabel="Log In"
        handleSubmit={handleFormSubmit}
        isLoading={isLoading}
      >
        <Input
          name="email"
          label="Email"
          type="text"
          placeholder="Enter email"
          emoji="📧"
          required
          handleChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          emoji="🙈"
          required
          handleChange={handleChange}
        />
      </Form>
    </div>
  );
};
