import Table from "react-bootstrap/Table";
import Header from "../Components/Header";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeTask } from "../redux/Features/TaskSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function TaskList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState("All");

  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks =
    filterStatus === "All"
      ? storedTasks
      : storedTasks.filter((task) => task.status === filterStatus);

  const handleDelete = (taskId) => {
    dispatch(removeTask({ id: taskId }));

    const getStorageData = JSON.parse(localStorage.getItem("tasks"));
    const updateTasks = getStorageData.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  };

  return (
    <>
      <Header />
      <div style={{ margin: "1%" }}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Filter by Status: {filterStatus}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilterStatus("All")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus("pending")}>
              Pending
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus("completed")}>
              Completed
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.date}</td>
              <td>{item.status}</td>
              <td>
                <Button
                  className="mx-3"
                  onClick={() => navigate("/update", { state: { data: item } })}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TaskList;
