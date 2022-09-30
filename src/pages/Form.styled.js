import styled from "styled-components";

import { StyledForm, commonHeaderSection } from "./QuizFrom/Form.styled";
import { StyledQuesTionContainer } from "../Components/Question/Question.styled";

export const StyleViewdForm = styled(StyledForm)``;

export const StyledHeaderSection = styled(commonHeaderSection)`
  padding: 25px;
  border-top: 10px solid rgb(66, 47, 245);
  & h1 {
    height: 50px;
    font-size: 2rem;
    font-weight: bold;
  }
  & p {
  }
`;
export const StyledViewQuesTionContainer = styled(StyledHeaderSection)`
  margin: 0;
  border: 0;
  padding: 0;
  margin-top: 2em;
  background-color: transparent;
`;

export const StyledViewQuesTionItem = styled(StyledQuesTionContainer)`
  /* padding: 0; */
`;

export const StyledViewQuestionHeader = styled.header`
  & div {
    &:nth-of-type(1) {
      display: flex;
      /* padding-top: 1em; */
      /* padding-bottom: 1em; */
      & span {
        margin-left: auto;
        font-weight: bold;
        color: red;
      }
    }
  }
`;

export const StyledViewOptionsContainer = styled.div`
  padding-top: 2em;
  /* padding-bottom: 1.5em; */
`;
