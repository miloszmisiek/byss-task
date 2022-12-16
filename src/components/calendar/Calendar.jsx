import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getDaysInMonth,
  range,
  sortWeekDays,
  splitToWeeks,
  weekDays,
} from "../../utils/utils";
import { DayCol, WeekRow } from "./styled";
import { EventElement } from "../EventForm/styled";

function Calendar({ events, setEvents }) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [calendarEvents, setCalendarEvents] = useState([]);
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
    dragItem.current = { idx, target: e.target };
  };

  const onDragEnter = (date, e) => {
    e.preventDefault();
    dragOverItem.current = date;
  };

  const drop = (e) => {
    e.preventDefault();
    console.log(dragItem.current.idx, dragOverItem);

    setCalendarEvents((prev) =>
      prev.map((ev, idx) => {
        if (idx === dragItem.current.idx) {
          ev.date = dragOverItem.current;
        }
        return ev;
      })
    );
  };

  useEffect(() => {
    setCalendarEvents(events);
    console.log(calendarEvents);
    console.log(weeks);
  }, [events]);

  return (
    <Container>
      <Row>
        <Col onClick={prevYear}>{"<<"}</Col>
        <Col onClick={prevMonth}>{"<"}</Col>
        <Col xs={5}>
          {now.toLocaleString("en-us", { month: "long" })} {now.getFullYear()}
        </Col>
        <Col onClick={nextMonth}>{">"}</Col>
        <Col onClick={nextYear}>{">>"}</Col>
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
            const nowString = d !== "" ? y + "-" + m + "-" + d : undefined;
            const evArr = events?.filter((ev) => ev.date === nowString);
            return (
              <DayCol
                onDragEnter={(e) => onDragEnter(nowString, e)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={drop}
                day={d}
              >
                {d}
                {evArr?.map((ev, idx) => (
                  <EventElement onDragStart={(e) => drag(idx, e)} draggable>
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
