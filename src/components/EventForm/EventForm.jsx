import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { EVENTS } from "../../mockup";
import MyModal from "../MyModal";
import CloseButton from "react-bootstrap/CloseButton";

function EventForm({ events, setEvents, edit, setEdit }) {
  const initialState = {
    title: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  };
  const [eventData, setEventData] = useState(initialState);
  //   const [isEdit, setIsEdit] = useState(false);
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
            description: description,
          };
        }
        return obj;
      })
    );
    setEdit(null);
    // setIsEdit(false);
  };
  const deleteEvent = () => {
    setEvents((current) =>
      current.filter((obj) => {
        return obj.evId !== edit;
      })
    );
    setEdit(null);
    // setIsEdit(false);
    setEventData(initialState);
  };
  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
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
    // setIsEdit(false);
    setEdit(null);
    setEventData(initialState);
  };

  useEffect(() => {
    if (edit !== null) {
      //   setIsEdit(true);
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
        event={edit !== null ? events.find((ev) => ev.evId === edit).title : ""}
      />
      <Form onSubmit={handleSubmit}>
        <div>
          {edit !== null ? (
            <>
              {"Edit Event"}{" "}
              <CloseButton onClick={closeEditForm} aria-label="Hide" />
            </>
          ) : (
            "Add Event"
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
          {edit === null ? "Submit" : "Save"}
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
