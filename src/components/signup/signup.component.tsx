import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Form } from "../../components/form/form.component";
import { Input } from "../../components/input/input.component";
import { AuthContext } from "../../context/auth/auth.context";
import "./signup.styles.scss";

export const SignUp = () => {
  const { signUpWithEmailAndPassword } = useContext(AuthContext);

  const [signUpState, setSignUpState] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>({ firstName: "", lastName: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setSignUpState({ ...signUpState, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { firstName, lastName, email, password } = signUpState;

    setIsLoading(true);
    await signUpWithEmailAndPassword(firstName, lastName, email, password).then(
      (res) => {
        console.log(res);
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="signin-component">
      <Form
        title="Please Sign Up"
        emoji="🐒"
        buttonLabel="Sign Up"
        handleSubmit={handleFormSubmit}
        isLoading={isLoading}
      >
        <Input
          name="firstName"
          label="First Name"
          type="text"
          placeholder="Enter first name"
          emoji="🙉"
          required
          handleChange={handleChange}
        />
        <Input
          name="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          emoji="🙊"
          required
          handleChange={handleChange}
        />
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
