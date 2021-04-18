import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Form } from "../../components/form/form.component";
import { Input } from "../../components/input/input.component";
import { AuthContext } from "../../context/auth/auth.context";
import "./signup.styles.scss";

export const SignUp = () => {
  const { signUpWithEmailAndPassword } = useContext(AuthContext);

  const [signUpState, setSignUpState] = useState<{
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
    setSignUpState({ ...signUpState, [name]: value });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("form submitted");
  };

  return (
    <div className="signin-component">
      <Form
        title="Please Sign Up"
        emoji="🐒"
        buttonLabel="Sign Up"
        handleSubmit={handleFormSubmit}
      >
        <Input
          name="firstName"
          label="First Name"
          type="text"
          placeholder="Enter first name"
          emoji="🙉"
          handleChange={handleChange}
        />
        <Input
          name="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          emoji="🙊"
          handleChange={handleChange}
        />
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
          emoji="🙈"
          handleChange={handleChange}
        />
      </Form>
    </div>
  );
};
