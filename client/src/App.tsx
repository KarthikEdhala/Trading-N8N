import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateWorkflow from "./components/CreateWorkflow";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/create-workflow" element={<CreateWorkflow />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
