import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import styled from 'styled-components';

export const CalendarContainer = styled(Container)`
  border-radius: 0.5rem;
  background-color: rgba(247, 247, 249, 1);
  padding: 3rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  @media screen and (max-width: 610px) {
    padding: 1.3rem;
  }
`;

export const CalendarTop = styled(Row)`
  color: white;
  background-color: hsl(24 100% 65%);
`;

export const WeekRow = styled(Row)`
  flex-wrap: nowrap;
  padding: ${(props) => (props.head ? '1rem 0' : '0')};
`;

export const DayNames = styled(Col)`
  @media screen and (max-width: 610px) {
    padding: 0 0.1rem;
  }
`;

export const DayCol = styled(Col)`
  height: 80px;
  margin-top: 1px;
  margin-left: 1px;
  outline: ${(props) => (props.day ? '1px solid black' : 'undefined')};
  background-color: ${(props) => (props.day ? 'white' : 'undefined')};
  overflow-y: scroll;
  font-size: 0.7rem;
  text-align: left;

  @media screen and (max-width: 610px) {
    height: 60px;
    padding: 0 0.1rem;
  }
`;

export const CalendarIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

export const CalendarMonth = styled(Col)`
  font-weight: 700;
`;

export const CalendarsCol = styled(Col)`
  gap: 2rem;
  display: flex;
  flex-direction: column;
`;

export const PopperButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PopperIcon = styled(FontAwesomeIcon)`
  color: ${(props) => (props.edit ? '#6c757d' : '#dc3545')};
  float: ${(props) => (props.edit ? 'left' : 'right')};
  padding: 0 0.3rem;
  font-size: 1.2rem;
  margin: 0.5rem auto;
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.edit ? ' hsl(24 100% 65%)' : undefined)};
  }

  &.fa-shake:not(:hover) {
    animation: none;
  }
`;
