import { useState, useEffect } from "react";
import { getToDos, deleteToDo } from "../../api";
import { Link } from "react-router-dom";
// Bootstrap
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

export default function ToDoList(props) {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const convertDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const convertedDate = new Date(date).toLocaleString("en-US", options);
    return convertedDate;
  };

  useEffect(() => {
    getToDos()
      .then((res) => {
        setTodos(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSetId = (id, title) => {
    setId(id);
    setTitle(title);
    handleShowModal();
  };

  const deleteTask = () => {
    deleteToDo(id)
      .then((res) => {
        handleCloseModal();
        props.history.push("/");
        console.info(res.data);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };
  
  return (
    <Container className="mt-3 d-flex flex-wrap">
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Exclude {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteTask}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
      {todos.map((todo, key) => (
        <Card key={key} className="m-3" style={{ width: "18rem" }}>
          <Card.Header>
            <Card.Title className="position-relative">
              {todo.title}
              <Badge
                pill
                className={`position-absolute top-0 start-100 translate-middle p-2 bg-${
                  todo.priority === "High"
                    ? "danger"
                    : todo.priority === "Medium"
                    ? "warning"
                    : "info"
                } border border-light rounded-circle`}
              >
                <span >{todo.priority}</span>
              </Badge>
            </Card.Title>

            <small className="text-muted">
              Expire on: <br />
              {todo.expireDate
                ? convertDate(todo.expireDate)
                : "No expiry date"}
            </small>
          </Card.Header>
          <Card.Body>
            <Card.Text>{todo.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="secondary"
              className="float-end"
              onClick={() => handleSetId(todo._id, todo.title)}
            >
              Delete
            </Button>
            <Link to={`/todos/update/${todo._id}`} className="btn btn-success">
              Edit
            </Link>
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
}
