import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//context
import { AuthContext } from "./context/auth/auth.context";

//custom components
import { Header } from "./components/header/header.component";

//pages
import { ProjectsPage } from "./pages/projects/projects.page";
import { SignInSignUpPage } from "./pages/signin-signup/signin-signup.page";
import { useContext } from "react";

function App() {
  const { token } = useContext(AuthContext);

  if (token) {
    return (
      <div className="app">
        <SignInSignUpPage />
      </div>
    );
  } else {
    return (
      <div className="app">
        <Header title="Monkey Business!" />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ProjectsPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
