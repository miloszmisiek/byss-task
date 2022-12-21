import { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { AppRow, AppWrapper } from './App.styled';
import Calendar from './components/calendar/Calendar';
import { CalendarsCol } from './components/calendar/styled';
import EventForm from './components/EventForm/EventForm';

function App() {
  const [events, setEvents] = useState([]);
  const [edit, setEdit] = useState(null);
  const [selected, setSelected] = useState([]);
  const dragItem = useRef();
  const dragOverItem = useRef();
  return (
    <AppWrapper>
      <Container fluid="sm">
        <AppRow>
          <Col xs={12} lg={6}>
            <EventForm events={events} setEvents={setEvents} edit={edit} setEdit={setEdit} />
          </Col>
          <CalendarsCol xs={12} lg={6}>
            {[...Array(2).keys()].map((n) => (
              <Calendar
                key={n}
                id={n}
                events={events}
                setEvents={setEvents}
                dragItem={dragItem}
                dragOverItem={dragOverItem}
                setEdit={setEdit}
                edit={edit}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </CalendarsCol>
        </AppRow>
      </Container>
    </AppWrapper>
  );
}

export default App;
