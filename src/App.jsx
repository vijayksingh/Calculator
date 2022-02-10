import { useReducer, useState } from "react";
import styled from "styled-components";
import "./App.css";
import {
  DigitButton,
  OperandButton,
  ScientificButton,
} from "./components/Button";
import Wrapper from "./components/Wrapper";
import { operationMap } from "./helpers/calculator";

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

export default function App() {
  const [input, setInput] = useState(0);
  const [mode, setCommandMode] = useState("INPUT");

  const operationReducer = (prev, action) => {
    if(action.type === "RESET") {
      return ({type: "", value: 0});
    }
    
    if (prev["type"]) {
      const operation = operationMap[prev.type];
      const result = operation(prev.value, action.value);
      setInput(result);

      action = {...action, value: result};
    }

    if(action.type === "EQUALS") {
      return ({type: "", value: 0});
    }

    return action;
  };

  const [queuedAction, dispatch] = useReducer(operationReducer, {
    type: "",
    value: 0,
  });

  const scientificButtons = ["AC", "±", "%"];
  const digits = [0, ".", 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operands = ["+", "-", "*", "÷", "="];

  const registerInput = (e) => {
    let value = parseInt(e.target.textContent, 10);
    value = isNaN(value) ? e.target.textContent : value;

    if (value === ".") {
      setCommandMode("DECIMAL");
    }

    if (mode === "INPUT") {
      setInput(10 * input + value);
    } else if (mode === "DECIMAL") {
      // Handle Logic for DECIMAL
    } else {
      setInput(value);
      setCommandMode("INPUT");
    }
  };

  const registerOperand = (e) => {
    const value = e.target.textContent;
    setCommandMode("ACTION");
    // Dispatch action based on operand type
    switch (value) {
      case "+":
        dispatch({ type: "INCREMENT", value: input });
        break;
      case "-":
        dispatch({ type: "DECREMENT", value: input });
        break;
      case "=":
        dispatch({ type: "EQUALS", value: input });
        break;
      case "*":
        dispatch({ type: "MULTIPLY", value: input });
        break;
      case "÷":
        dispatch({ type: "DIVIDE", value: input });
        break;
      default:
        break;
    }
  };

  const resetInput = () => {
    setInput(0);
    dispatch({ type: "RESET" });
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
            <OperandButton key={operand} onClick={registerOperand}>
              {operand}
            </OperandButton>
          ))}
        </OperandWrapper>
      </InputWrapper>
    </Wrapper>
  );
}
