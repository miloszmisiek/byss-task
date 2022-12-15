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

function EventForm() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
  const [now, setNow] = useState(new Date());
  // const now = new Date();
  const monthDays = range(1, getDaysInMonth(now) + 1);
  const weeks = splitToWeeks(monthDays);

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

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  useEffect(() => {
    console.log(now);
  }, []);

  return (
    //   {/* {list &&
    //     list.map((item, index) => (
    //       <div
    //         style={{
    //           backgroundColor: "lightblue",
    //           margin: "20px 25%",
    //           textAlign: "center",
    //           fontSize: "40px",
    //         }}
    //         onDragStart={(e) => dragStart(e, index)}
    //         onDragEnter={(e) => dragEnter(e, index)}
    //         onDragEnd={drop}
    //         key={index}
    //         draggable
    //       >
    //         {item}
    //       </div>
    //     ))} */}

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
        {sortWeekDays(now).map((d) => (
          <Col>{d}</Col>
        ))}
      </WeekRow>
      {weeks.map((w) => (
        <WeekRow>
          {w.map((d) => (
            <DayCol>{d}</DayCol>
          ))}
        </WeekRow>
      ))}
    </Container>
  );
}

export default EventForm;
