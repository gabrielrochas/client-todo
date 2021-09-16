import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../logo.svg";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Links() {
  return (
    <React.Fragment>
      <LinkContainer to="/">
        <Navbar.Brand>
          <img src={logo} width="50" height="50" alt="logo" />
          To-Do List
        </Navbar.Brand>
      </LinkContainer>
      <Nav>
        <LinkContainer to="/todos/new">
          <Nav.Link>New To-Do</Nav.Link>
        </LinkContainer>
      </Nav>
    </React.Fragment>
  );
}
