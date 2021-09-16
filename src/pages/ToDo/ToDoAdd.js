import { useState } from "react";
import { insertToDo } from "../../api";


import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function ToDoAdd(props) {
  const [fields, setFields] = useState();
  const [validated, setValidated] = useState(false);


  const handleChange = (e) => {
    const auxFields = { ...fields };
    auxFields[e.target.id] = e.target.value;
    setFields(auxFields);
  };
  
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if(form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true)

    e.preventDefault();
    const data = { ...fields };
    console.log(data)
    insertToDo(data)
    .then(() => {
      props.history.push("/");
      window.location.reload()
    })
  }
  return (
    <Container className="mt-3">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <FloatingLabel controlId="title" className="mb-3" label="Title" onChange={handleChange} >
          <Form.Control required type="text" placeholder="#"/>
          <Form.Control.Feedback type="invalid">Inform a title</Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId="description" className="mb-3" label="Descriptiom" onChange={handleChange} >
          <Form.Control type="text" placeholder="#" />
        </FloatingLabel>
        <Row>
          <Col className="col-12 col-sm-12 col-md-4">
            <FloatingLabel controlId="priority" className="mb-3" label="Priority" onChange={handleChange} >
              <Form.Select required size="lg">
                <option></option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Choose a priority level</Form.Control.Feedback>
            </FloatingLabel>
          </Col>
          <Col  className="col-12 col-sm-12 col-md-4"> 
            <FloatingLabel controlId="expireDate" className="mb-3" label="Expire on" onChange={handleChange}>
              <Form.Control type="date" />
            </FloatingLabel>
          </Col>
          <Col  className="col-12 col-sm-12 col-md-4">
            <FloatingLabel controlId="status" className="mb-3" label="Status" onChange={handleChange} >
              <Form.Select size="lg">
                <option></option>
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Button className="mt-3" type="submit">Add New</Button>
      </Form>
    </Container>
  );
}
