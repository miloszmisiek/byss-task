import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MyModal from '../MyModal';
import CloseButton from 'react-bootstrap/CloseButton';

function EventForm({ events, setEvents, edit, setEdit }) {
  const initialState = {
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  };
  const [eventData, setEventData] = useState(initialState);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const { title, date, description } = eventData;
  const updateEvent = () => {
    setEvents((current) =>
      current.map((obj) => {
        if (obj.evId === edit) {
          return {
            ...obj,
            title: title,
            date: date,
            description: description
          };
        }
        return obj;
      })
    );
    setEdit(null);
  };
  const deleteEvent = () => {
    setEvents((current) =>
      current.filter((obj) => {
        return obj.evId !== edit;
      })
    );
    setEdit(null);
    setEventData(initialState);
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
      ? setEvents([...events, { ...eventData, id: 1, evId: events.length }])
      : updateEvent();
    setEventData(initialState);
  };
  const closeEditForm = () => {
    setEdit(null);
    setEventData(initialState);
  };
  useEffect(() => {
    if (edit !== null) {
      events.find((ev) => ev.evId === edit);
      setEventData(events.find((ev) => ev.evId === edit));
    }
  }, [edit]);

  return (
    <div>
      <MyModal
        show={show}
        setShow={setShow}
        deleteEvent={deleteEvent}
        event={edit !== null ? events.find((ev) => ev.evId === edit).title : ''}
      />
      <Form onSubmit={handleSubmit}>
        <div>
          {edit !== null ? (
            <>
              {'Edit Event'} <CloseButton onClick={closeEditForm} aria-label="Hide" />
            </>
          ) : (
            'Add Event'
          )}
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Event Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event title"
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
            value={description}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {edit === null ? 'Submit' : 'Save'}
        </Button>
        {edit !== null && (
          <Button onClick={handleShow} variant="danger">
            Delete
          </Button>
        )}
      </Form>
    </div>
  );
}

export default EventForm;
