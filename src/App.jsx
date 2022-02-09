import { useReducer, useState } from "react";
import styled from "styled-components";
import "./App.css";
import Wrapper from "./components/Wrapper";

const ResultWrapper = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: end;
  color: white;
  font-size: 3rem;
  padding-bottom: 8px;
  padding-right: 12px;
  height: 125px;
`;

const DigitWrapper = styled.section`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  width: 300px;
`;

const OperandWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100px;
`;

const InputWrapper = styled.section`
  display: flex;
  height: 375px;
`;

const Button = styled.button`
  display: inline-block;
  width: 100px;
  height: 75px;
  text-align: center;
  font-size: 1.5rem;
  color: #cfcfcf;
  border: 1px solid #252625;
`;

const OperandButton = styled(Button)`
  background-color: #ff9f0b;
  font-size: 2rem;
  border-right: none;

  &::last-child {
    border-bottom-right-radius: 6px;
  }
`;

const DigitButton = styled(Button)`
  background-color: #5a5a5a;
`;
const ScientificButton = styled(Button)`
  background-color: #3b3e3f;
`;

export default function App() {
  const [input, setInput] = useState(0);
  const [actionState, setAction] = useState(null);

  const operationMap = {
    INCREMENT: (a, b) => a + b,
    DECREMENT: (a, b) => a - b,
  };

  const operationReducer = (prev, action) => {
    // Previous
    if (!actionState && !action["type"]) {
      const operation = operationMap[actionState.type];
      setInput(operation(actionState.value, action.value));
    }

    switch (action.type) {
      case "INCREMENT":
        setAction({ type: "INCREMENT", value: parseInt(action.value, 10) });
        break;

      case "DECREMENT":
        setAction({ type: "DECREMENT", value: parseInt(action.value, 10) });
        break;

      case "RESULT":
        return action.value;

      default:
        break;
    }
  };

  const [result, dispatch] = useReducer(operationReducer, {
    currentOperation: "",
    value: 0,
  });

  const scientificButtons = ["AC", "±", "%"];
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operands = ["+", "-", "*", "÷", "="];

  const registerInput = (e) => {
    const value = parseInt(e.target.textContent, 10);
    setInput(10*input + value);
  };

  const registerOperand = (e) => {
    const value = e.target.textContent;
    // Dispatch action based on operand type
    switch (value) {
      case "+":
        dispatch({ type: "INCREMENT", value: input });
        break;
      case "-":
        dispatch({ type: "DECREMENT", value: input });
        break;
      case "=":
        dispatch({ type: "RESULT", value: input });
        break;
      default:
        break;
    }
    resetInput();
  };

  const resetInput = () => {
    setInput(0);
  };

  return (
    <Wrapper>
      <ResultWrapper>{input}</ResultWrapper>
      <InputWrapper>
        {/* Section to contain all calculator digits */}
        <DigitWrapper>
          {scientificButtons
            .map((button) => (
              <ScientificButton key={button} onClick={resetInput}>
                {button}
              </ScientificButton>
            ))
            .reverse()}
          {digits
            .map((digit) => (
              <DigitButton key={digit} onClick={registerInput}>
                {digit}
              </DigitButton>
            ))
            .reverse()}
        </DigitWrapper>

        {/* Section to contain all calculator operands */}
        <OperandWrapper>
          {operands.map((operand) => (
            <OperandButton onClick={registerInput}>{operand}</OperandButton>
          ))}
        </OperandWrapper>
      </InputWrapper>
    </Wrapper>
  );
}
