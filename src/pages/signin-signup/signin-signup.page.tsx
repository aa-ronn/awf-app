import { useState } from "react";
import { SignIn } from "../../components/signin/signin.component";
import { SignUp } from "../../components/signup/signup.component";
import "./signin-signup.styles.scss";

export const SignInSignUpPage = () => {
  const [isSigningIn, setIsSigningIn] = useState(true);

  return (
    <div className="signin-signup-page">
      <h2 className="signin-signup-title">🐵 Business</h2>
      {isSigningIn ? <SignIn /> : <SignUp />}
      <p
        className="need-an-account"
        onClick={() => setIsSigningIn(!isSigningIn)}
      >
        {isSigningIn ? "Don't have an account?" : "Already have an account?"}
      </p>
    </div>
  );
};
