import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import styled from 'styled-components';

export const WeekRow = styled(Row)`
  flex-wrap: nowrap;
`;

export const DayCol = styled(Col)`
  height: 120px;
  outline: ${(props) => (props.day ? '1px solid black' : 'undefined')};
`;
