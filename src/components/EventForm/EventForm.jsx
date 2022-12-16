import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { EVENTS } from "../../mockup";

function EventForm({ events, setEvents }) {
  const [eventData, setEventData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const { title, date, description } = eventData;
  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, eventData]);
    console.log(EVENTS);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Event Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event title"
            name="title"
            value={title}
            onChange={handleChange}
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
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EventForm;
