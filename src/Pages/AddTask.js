import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Header from "../Components/Header";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTask } from "../redux/Features/TaskSlice";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";

function AddNewTask() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    date: null,
    status: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (!input.title || !input.description || !input.date || !input.status) {
      alert("Please fill in all fields.");
      return;
    }
    const taskId = nanoid();
    e.preventDefault();
    dispatch(addTask({ id: taskId, ...input }));

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = { id: taskId, ...input };
    storedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    setInput({
      title: "",
      description: "",
      date: null,
      status: "",
    });
    navigate("/");
  };

  return (
    <>
      <Header />
      <div style={{ justifyContent: "center", display: "flex" }}>
        <h2>Add Task</h2>
      </div>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: "bold" }}>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              onChange={(e) => setInput({ ...input, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: "bold" }}>Due Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Password"
              onChange={(e) => setInput({ ...input, date: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicStatus">
            <Form.Label style={{ fontWeight: "bold" }}>Status</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Pending"
                value="pending"
                checked={input.status === "pending"}
                onChange={() => setInput({ ...input, status: "pending" })}
              />
              <Form.Check
                inline
                type="radio"
                label="Completed"
                value="completed"
                checked={input.status === "completed"}
                onChange={() => setInput({ ...input, status: "completed" })}
              />
            </div>
          </Form.Group>
          <Button
            variant="primary"
            className="mx-2"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>

          <Link to={"/"}>
            <Button variant="primary" type="submit">
              Back To List
            </Button>
          </Link>
        </Form>
      </Container>
    </>
  );
}

export default AddNewTask;
