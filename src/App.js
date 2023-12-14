import "./App.css";
import AddNewTask from "./Pages/AddTask";
import EditTask from "./Pages/EditTask";
import TaskList from "./Pages/TaskList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<TaskList />} />
          <Route path="/addTask" element={<AddNewTask />} />
          <Route path="/update" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
