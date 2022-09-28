import styled from "styled-components";

export const StyledQuesTionContainer = styled.div`
  padding: 1em;
  //found a way around to fix the layout of panel header
  & .ant-collapse-header {
    display: flex;
    gap: 10px;
    cursor: pointer;
  }
`;
