import styled from "styled-components";

export const Button = styled.button`
  display: inline-block;
  width: 100px;
  height: 75px;
  text-align: center;
  font-size: 1.5rem;
  color: #cfcfcf;
  border: 1px solid #252625;

    &:hover {
        border: 1px solid #cfcfcf;
    }

    &:active {
        border: 1px solid #cfcfcf;
    }
`;

export const OperandButton = styled(Button)`
  background-color: #ff9f0b;
  font-size: 2rem;
  border-right: none;

  &:last-child {
    border-bottom-right-radius: 6px;
  }
`;


export const DigitButton = styled(Button)`
  background-color: #5a5a5a;

  &:last-child {
    width: 200px;
    border-bottom-left-radius: 6px;
  }
`;


export const ScientificButton = styled(Button)`
  background-color: #3b3e3f;
`;
