import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home/Home";
import { CProvider } from "./Component/Context/Context";

function App() {
  
  return (
    <CProvider>
      <BrowserRouter>
        <div className="App">
          <Home />
        </div>
      </BrowserRouter>
    </CProvider>
  );
}

export default App;
