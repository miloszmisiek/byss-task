import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getDaysInMonth, range, sortWeekDays, splitToWeeks, weekDays } from '../../utils/utils';
import { DayCol, WeekRow } from './styled';
import { EventElement } from '../EventForm/styled';

function Calendar(props) {
  const { events, setEvents, dragItem, dragOverItem, id, setEdit, selected, setSelected } = props;
  const [now, setNow] = useState(new Date());
  const monthDays = range(1, getDaysInMonth(now) + 1);
  const weeks = splitToWeeks(now, monthDays);

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
    if (selected.length && selected?.some((el) => el.target === e.target.innerHTML)) {
      dragItem.current = selected;
    } else {
      dragItem.current = { idx, target: e.target.innerHTML };
    }
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
    if (e.detail === 1) {
      if (!selected.length) {
        setSelected((prev) => [...prev, { idx, target: e.target.innerHTML }]);
      }
      if (!selected?.some((el) => el.idx === idx && el.target === e.target.innerHTML)) {
        setSelected((prev) => [...prev, { idx, target: e.target.innerHTML }]);
      } else {
        setSelected((current) =>
          current.filter((obj) => obj.idx !== idx && obj.target !== e.target.innerHTML)
        );
      }
    }
    if (e.detail === 2) {
      setEdit(idx);
    }
  };

  useEffect(() => {
    setEvents(events);
  }, [events, selected]);

  return (
    <Container>
      <Row>
        <Col onClick={prevYear}>
          <FontAwesomeIcon icon="fas fa-angle-double-left" />
        </Col>
        <Col onClick={prevMonth}>
          <FontAwesomeIcon icon="fas fa-angle-left" />
        </Col>
        <Col xs={5}>
          {now.toLocaleString('en-us', { month: 'long' })} {now.getFullYear()}
        </Col>
        <Col onClick={nextMonth}>
          <FontAwesomeIcon icon="fas fa-angle-right" />
        </Col>
        <Col onClick={nextYear}>
          <FontAwesomeIcon icon="fas fa-angle-double-right" />
        </Col>
      </Row>
      <WeekRow>
        {weekDays.map((d) => (
          <Col>{d}</Col>
        ))}
      </WeekRow>
      {weeks.map((w) => (
        <WeekRow>
          {w.map((d) => {
            const y = now.getFullYear();
            const m = now.getMonth() + 1;
            const nowString =
              d !== '' ? y + '-' + m + '-' + d.toString().padStart(2, '0') : undefined;
            const evArr = events?.filter((ev) => ev.date === nowString && ev.id === id);
            return (
              <DayCol
                onDragEnter={(e) => onDragEnter(nowString, e, id)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={drop}
                day={d}>
                {d}
                {evArr?.map((ev) => (
                  <EventElement
                    onClick={(e) => handleClick(ev.evId, e)}
                    onDragStart={(e) => drag(ev.evId, e)}
                    draggable
                    selected={selected?.some((el) => el.idx === ev.evId)}>
                    {ev.title}
                  </EventElement>
                ))}
              </DayCol>
            );
          })}
        </WeekRow>
      ))}
    </Container>
  );
}

export default Calendar;
