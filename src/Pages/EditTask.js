import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Header from "../Components/Header";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateTask } from "../redux/Features/TaskSlice";
import { useLocation, useNavigate, Link } from "react-router-dom";

function EditTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const {
    id,
    title: initialTitle,
    description: initialDescription,
    date: initialDate,
    status: initialStatus,
  } = state.data;

  const [input, setInput] = useState({
    title: initialTitle,
    description: initialDescription,
    date: initialDate,
    status: initialStatus,
  });

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id, ...input }));

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.map((task) =>
      task.id === id ? { ...task, ...input } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
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
        <h2>Edit Task</h2>
      </div>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: "bold" }}>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder={state.data.title}
              onChange={(e) => setInput({ ...input, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder={state.data.description}
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: "bold" }}>Due Date</Form.Label>
            <Form.Control
              type="date"
              placeholder={state.data.date}
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

export default EditTask;
