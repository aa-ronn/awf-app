import './App.scss';

//custom components
import { Header } from "./components/header/header.component";

function App() {
  return (
    <div className="app">
      <Header title="Our new app" username="Sir Elliot Pilgrim" />
    </div>
  );
}

export default App;
