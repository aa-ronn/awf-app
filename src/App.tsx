import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//context
import { StoreProvider } from "./context/store/store.context";

//custom components
import { Header } from "./components/header/header.component";

//pages
import { HomePage } from "./pages/home.pages";

function App() {
  return (
    <div className="app">
      <StoreProvider>
        <Header title="Do a Project!" username="Sally Rogers" />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;
