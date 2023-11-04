import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
