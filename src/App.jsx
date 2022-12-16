import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import EventForm from "./components/EventForm/EventForm";

function App() {
  const [events, setEvents] = useState([]);
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <EventForm events={events} setEvents={setEvents} />
          </Col>
          <Col>
            <Calendar events={events} setEvents={setEvents} />
            <hr />
            <Calendar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
