import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Links from "./Links";

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Links />
      </Container>
    </Navbar>
  );
}
