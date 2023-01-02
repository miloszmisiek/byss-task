import React, { useState, useEffect, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { getDaysInMonth, range, splitToWeeks, weekDays } from '../../utils/utils';
import {
  CalendarContainer,
  CalendarIcon,
  CalendarMonth,
  CalendarTop,
  DayCol,
  PopperButtons,
  PopperIcon,
  WeekRow,
  DayNames
} from './styled';
import EventWrapper from '../EventWrapper';
import MyModal from '../myModal/MyModal';
import { EventElement } from '../EventForm/styled';

function Calendar(props) {
  const { events, setEvents, dragItem, dragOverItem, id, setEdit, selected, setSelected, edit } =
    props;
  const [now, setNow] = useState(new Date());
  const [showPopover, setShowPopover] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const monthDays = range(1, getDaysInMonth(now) + 1);
  const weeks = splitToWeeks(now, monthDays);
  const deleteRef = useRef(null);

  const prevMonth = () => {
    const mon = now.getMonth();
    if (mon > 0) {
      now.setMonth(mon - 1);
    } else {
      now.setMonth(11);
      now.setFullYear(now.getFullYear() - 1);
    }
    setNow(new Date(now));
  };
  const nextMonth = () => {
    const mon = now.getMonth();
    if (mon < 11) {
      now.setMonth(mon + 1);
    } else {
      now.setMonth(0);
      now.setFullYear(now.getFullYear() + 1);
    }

    setNow(new Date(now));
  };
  const prevYear = () => {
    now.setFullYear(now.getFullYear() - 1);
    setNow(new Date(now));
  };
  const nextYear = () => {
    now.setFullYear(now.getFullYear() + 1);
    setNow(new Date(now));
  };
  const drag = (idx, e) => {
    selected.length && selected?.some((el) => el.target === e.target.innerHTML)
      ? (dragItem.current = selected)
      : (dragItem.current = { idx, target: e.target.innerHTML });
  };
  const onDragEnter = (date, e, id) => {
    e.preventDefault();
    dragOverItem.current = { date, id };
  };
  const drop = (e) => {
    e.preventDefault();
    setEvents((prev) =>
      prev.map((ev, idx) => {
        if (dragItem.current.length) {
          dragItem.current.forEach((itm) => {
            if (ev.evId === itm.idx) {
              ev.date = dragOverItem.current.date;
              ev.id = dragOverItem.current.id;
            }
          });
        }
        if (idx === dragItem.current.idx) {
          ev.date = dragOverItem.current.date;
          ev.id = dragOverItem.current.id;
        }
        setSelected([]);
        return ev;
      })
    );
  };
  const handleClick = (idx, e) => {
    if (e.detail === 2) {
      setShowPopover(true);
    }
    if (
      showPopover &&
      !selected?.some((el) => el.idx === idx && el.target === e.target.innerHTML)
    ) {
      setShowPopover(false);
    }
    !selected?.some((el) => el.idx === idx && el.target === e.target.innerHTML) &&
    (e.metaKey || e.ctrlKey)
      ? setSelected((prev) => [...prev, { idx, target: e.target.innerHTML }])
      : setSelected([{ idx, target: e.target.innerHTML }]);
  };
  const deleteEvent = (id) => {
    setEvents((current) =>
      current.filter((obj) => {
        return obj.evId !== id;
      })
    );
    setEdit(null);
    setShowPopover(false);
  };
  useEffect(() => {
    setEvents(events);
  }, [events]);

  const popover = (data, edit) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">
        <strong>{data.title}</strong>
      </Popover.Header>
      <Popover.Body>
        <strong>Date:</strong> {data.date}
        <br />
        <strong>Description:</strong> {data.description}
        <br />
        <PopperButtons>
          <PopperIcon
            icon="fas fa-edit"
            edit="_"
            onClick={() => {
              edit(data.evId);
              setShowPopover(false);
            }}
          />
          <PopperIcon
            ref={deleteRef}
            className="fa-shake"
            icon="fas fa-trash"
            onClick={() => {
              handleShow();
            }}
          />
        </PopperButtons>
      </Popover.Body>
    </Popover>
  );
  return (
    <CalendarContainer>
      <CalendarTop>
        <Col onClick={prevYear}>
          <CalendarIcon icon="fas fa-angle-double-left" />
        </Col>
        <Col onClick={prevMonth}>
          <CalendarIcon icon="fas fa-angle-left" />
        </Col>
        <CalendarMonth xs={5}>
          {now.toLocaleString('en-us', { month: 'long' })} {now.getFullYear()}
        </CalendarMonth>
        <Col onClick={nextMonth}>
          <CalendarIcon icon="fas fa-angle-right" />
        </Col>
        <Col onClick={nextYear}>
          <CalendarIcon icon="fas fa-angle-double-right" />
        </Col>
      </CalendarTop>
      <WeekRow head="true">
        {weekDays.map((d) => (
          <DayNames key={d}>{d}</DayNames>
        ))}
      </WeekRow>
      {weeks.map((w, i) => (
        <WeekRow key={i}>
          {w.map((d, i) => {
            const y = now.getFullYear();
            const m = now.getMonth() + 1;
            const nowString =
              d !== '' ? y + '-' + m.toString().padStart(2, '0') + '-' + d.toString().padStart(2, '0') : undefined;
            const evArr = events?.filter((ev) => ev.date === nowString && ev.id === id);
            console.log(nowString);
            console.log(evArr);
            return (
              <DayCol
                onDragEnter={(e) => onDragEnter(nowString, e, id)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={drop}
                day={d}
                key={i}>
                {d}
                {evArr?.map((ev) => (
                  <EventWrapper
                    setSelected={setSelected}
                    selected={selected}
                    showPopover={showPopover}
                    setShowPopover={setShowPopover}
                    edit={edit}
                    deleteRef={deleteRef}
                    key={ev.evId}>
                    <MyModal
                      show={show}
                      setShow={setShow}
                      setShowPopover={setShowPopover}
                      deleteEvent={deleteEvent}
                      selected={selected}
                    />
                    <OverlayTrigger
                      trigger="focus"
                      rootClose
                      show={selected?.some((el) => el.idx === ev.evId) && showPopover}
                      placement="right"
                      overlay={popover(ev, setEdit)}>
                      <EventElement
                        idx={ev.evId}
                        color={ev.color}
                        className="events"
                        onClick={(e) => handleClick(ev.evId, e)}
                        onDragStart={(e) => drag(ev.evId, e)}
                        draggable
                        selected={selected?.some((el) => el.idx === ev.evId)}
                        animate={selected.length > 1}>
                        {ev.title}
                      </EventElement>
                    </OverlayTrigger>
                  </EventWrapper>
                ))}
              </DayCol>
            );
          })}
        </WeekRow>
      ))}
    </CalendarContainer>
  );
}

export default Calendar;
