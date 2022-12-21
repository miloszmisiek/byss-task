import styled from 'styled-components';
import { COLORS } from '../../const';

export const EventWrapper = styled.div`
  border-radius: 8px;
  padding: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  background-color: hsl(24 100% 65%);
  color: white;
`;

export const EventElement = styled.div`
  width: 0;
  min-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0.3rem auto;
  padding: 0 0.3rem;
  box-shadow: ${(props) =>
    props.selected && !props.animate
      ? 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
      : undefined};
  /* outline: ${(props) =>
    !props.selected
      ? `1px solid ${props.color}`
      : props.color === COLORS[0]
      ? '1px solid black'
      : '1px solid red'}; */
  border-radius: 4px;
  font-size: 0.7rem;
  background-color: ${(props) => props.color};
  /* color: ${(props) => (props.color === COLORS[2] ? 'black' : 'white')}; */
  color: white;
  cursor: pointer;
  text-align: center;

  animation: ${(props) =>
    props.selected && props.animate ? 'horizontal-shaking 0.5s' : undefined};
  animation-iteration-count: ${(props) =>
    props.selected && props.animate ? 'infinite' : undefined};
  @keyframes horizontal-shaking {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(5px);
    }
    50% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export const FormHead = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 2rem;
  letter-spacing: 0.2rem;
  font-family: 'Chakra Petch', sans-serif;

  .btn-close {
    float: right;
    font-size: 1rem;
  }
`;

export const EventFormHr = styled.hr`
  border-top: 3px solid white;
  opacity: 1;
  border-radius: 23%;
`;

export const EventButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  button {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
      rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
      rgba(0, 0, 0, 0.07) 0px 16px 16px;
  }
`;

export const ColorsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;
  margin: 0 auto;
`;

export const ColorPicker = styled.input`
  display: none;
  &:checked + label {
    background-color: ${(props) => props.color};
    color: ${(props) => props.color};
    border: 1px solid rgba(94, 206, 123, 1);
    padding: 3px;
  }
`;

export const ColorsFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: baseline;
  border: none;
  margin: 0;
`;

export const ColorsLegend = styled.legend`
  margin: 0 auto;
  padding-bottom: 0.5rem;
`;

export const CPLabel = styled.label`
  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: ${(props) => props.color};
  text-align: center;
  flex-wrap: wrap;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

export const ColorBox = styled.div`
  outline: ${(props) => props.color};
  background-color: ${(props) => props.color};
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
