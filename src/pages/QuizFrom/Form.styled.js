import styled from "styled-components";
import { Form, Button } from "antd";

export const StyledForm = styled(Form)`
  background-color: rgb(212, 173, 237);
  padding-bottom: 50px;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  gap: 10px;
`;

export const StyledQuestionSection = styled.section`
  width: 75%;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  &:nth-of-type(1) {
    padding: 25px;
    border-top: 10px solid rgb(66, 47, 245);

    & input {
      all: unset;
      width: 100%;
      text-transform: capitalize;
      height: 50px;
      font-size: 2rem;
    }
  }
  & textarea {
    text-transform: capitalize;
    outline: none;
    border: none;
  }
  &:nth-of-type(2) {
    margin-top: calc(1em + 20px);
    display: flex;
    flex-direction: column;
    gap: 3em;

    background-color: transparent;
    padding: 0;
  }
`;

export const StledAddQuestionButton = styled(Button)`
  position: fixed;
  top: 20%;
  padding: 1em;
  transform: translateY(50%);
`;
