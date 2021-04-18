import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//context
import { AuthContext } from "./context/auth/auth.context";

//custom components
import { Header } from "./components/header/header.component";

//pages
import { HomePage } from "./pages/home/home.page";
import { SignInSignUpPage } from "./pages/signin-signup/signin-signup.page";
import { useContext } from "react";

function App() {
  const { token } = useContext(AuthContext);

  if (!token) {
    return (
      <div className="app">
        <SignInSignUpPage />
      </div>
    );
  } else {
    return (
      <div className="app">
        <Header title="Do a Project!" username="Sally Rogers" />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
