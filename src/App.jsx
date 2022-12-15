import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import EventForm from "./components/EventForm/EventForm";

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <div>
              <EventForm />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
