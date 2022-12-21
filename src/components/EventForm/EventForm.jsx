import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import {
  ColorBox,
  ColorPicker,
  ColorsFieldset,
  ColorsLegend,
  ColorsWrapper,
  CPLabel,
  EventButtons,
  EventFormHr,
  EventWrapper,
  FormHead
} from './styled';
import { COLORS } from '../../const';

function EventForm({ events, setEvents, edit, setEdit }) {
  const initialState = {
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    color: COLORS[0]
  };
  const [eventData, setEventData] = useState(initialState);
  const { title, date, description, color } = eventData;
  const updateEvent = () => {
    setEvents((current) =>
      current.map((obj) => {
        if (obj.evId === edit) {
          return {
            ...obj,
            title: title,
            date: date,
            description: description,
            color: color
          };
        }
        return obj;
      })
    );
    setEdit(null);
  };

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    edit === null
      ? setEvents([...events, { ...eventData, id: 0, evId: events.length }])
      : updateEvent();
    setEventData(initialState);
  };
  const closeEditForm = () => {
    setEdit(null);
    setEventData(initialState);
  };
  useEffect(() => {
    if (edit !== null) {
      window.scrollTo(0, 0);
      events.find((ev) => ev.evId === edit);
      setEventData(events.find((ev) => ev.evId === edit));
    }
  }, [edit]);

  return (
    <EventWrapper>
      <Form onSubmit={handleSubmit}>
        <FormHead>
          {edit !== null ? (
            <>
              {'Edit Event'}
              <CloseButton onClick={closeEditForm} variant="white" aria-label="Hide" />
            </>
          ) : (
            'Add Event'
          )}
        </FormHead>
        <EventFormHr />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event title..."
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date"
            name="date"
            value={date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="eventTextArea">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            placeholder="Type event description..."
            value={description}
            onChange={handleChange}
          />
        </Form.Group>
        <ColorsFieldset className="mb-3">
          <ColorsLegend as={Form.Label}>Color</ColorsLegend>
          <ColorsWrapper>
            {COLORS.map((c) => (
              <React.Fragment key={c}>
                <ColorPicker
                  type="radio"
                  name="color"
                  id={c}
                  value={c}
                  checked={color === c}
                  onChange={handleChange}
                />
                <CPLabel htmlFor={c}>
                  <ColorBox color={c} />
                </CPLabel>
              </React.Fragment>
            ))}
          </ColorsWrapper>
        </ColorsFieldset>
        <EventFormHr />
        <EventButtons>
          <Button variant={edit !== null ? 'success' : 'primary'} type="submit">
            {edit === null ? 'Submit' : 'Save'}
          </Button>
        </EventButtons>
      </Form>
    </EventWrapper>
  );
}

export default EventForm;
