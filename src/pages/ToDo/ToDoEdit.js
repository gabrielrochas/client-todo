import { useEffect, useState } from "react";
import { getToDo, updateToDo } from "../../api";
import { Link } from "react-router-dom";

// Bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function ToDoEdit(props) {
  const id = props.match.params.id
  const [fields, setFields] = useState({});
  const [validated, setValidated] = useState(false);

  useEffect( () => {
    getToDo(id).then((res) => setFields(res.data.data));
  }, [id]);

  const handleChange = (e) => {
    const auxFields = { ...fields };
    auxFields[e.target.id] = e.target.value;
    setFields(auxFields);
  };
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();
    await updateToDo(id, { ...fields });
  };

  return (
    <Container className="mt-3">
      <Form noValidate validated={validated}>
        <Row>
          <Col>
            <FloatingLabel
              controlId="title"
              className="mb-3"
              label="Title"
              onChange={handleChange}
            >
              <Form.Control
                required
                type="text"
                placeholder="#"
                defaultValue={fields.title}
              />
              <Form.Control.Feedback type="invalid">
                Please provie a task title
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId="priority"
              className="mb-3"
              label="Priority"
              onChange={handleChange}
            >
              <Form.Select required>
                <option></option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Choose a priority level
              </Form.Control.Feedback>
            </FloatingLabel>
            <Row>
              <Col className="d-grid gap-2 d-sm-flex">
                <FloatingLabel
                  controlId="expireDate"
                  className="mb-3 col-12 col-sm-6"
                  label="Expire in"
                  onChange={handleChange}
                >
                  <Form.Control
                    type="date"
                    defaultValue={Date(fields.expireDate)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  className="mb-3 col-12 col-sm-6"
                  controlId="status"
                  label="Status"
                  onChange={handleChange}
                >
                  <Form.Select size="lg">
                    <option></option>
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
          </Col>
          <Col className="col-12 col-sm-12 col-md-6">
            <FloatingLabel
              className="h-100"
              controlId="decription"
              label="Description"
              onChange={handleChange}
            >
              <Form.Control
                className="h-100"
                as="textarea"
                placeholder="#"
                defaultValue={fields.description}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Col className="d-grid gap-2 col-12 col-sm-6 col-md-5 d-md-flex mt-4">
          <Button onClick={handleSubmit}>Update Task</Button>
          <Link to="/" className="btn btn-success">
            Conluir
          </Link>
        </Col>
      </Form>
    </Container>
  );
}
