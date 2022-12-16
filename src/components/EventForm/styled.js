import styled from 'styled-components';

export const EventElement = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  outline: 1px solid blue;
  border-radius: 4px;
  font-size: 0.7rem;
  background-color: blue;
  color: white;
  outline: ${(props) => (props.selected ? '1px solid red' : 'undefined')};
`;
