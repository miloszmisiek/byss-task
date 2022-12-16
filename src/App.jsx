import { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import EventForm from "./components/EventForm/EventForm";

function App() {
  const [events, setEvents] = useState([]);
  const [edit, setEdit] = useState(null);
  const [selected, setSelected] = useState([]);
  const dragItem = useRef();
  const dragOverItem = useRef();
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <EventForm
              events={events}
              setEvents={setEvents}
              edit={edit}
              setEdit={setEdit}
            />
          </Col>
          <Col>
            <Calendar
              id={1}
              events={events}
              setEvents={setEvents}
              dragItem={dragItem}
              dragOverItem={dragOverItem}
              setEdit={setEdit}
              edit={edit}
              selected={selected}
              setSelected={setSelected}
            />
            <hr />
            <Calendar
              id={2}
              events={events}
              setEvents={setEvents}
              dragItem={dragItem}
              dragOverItem={dragOverItem}
              setEdit={setEdit}
              selected={selected}
              setSelected={setSelected}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
