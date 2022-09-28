import styled from "styled-components";

export const StyledQuesTionContainer = styled.div`
  padding: 1em;
  //found a way around to fix the layout of panel header-antd@4.23.2
  & .ant-collapse-header {
    display: flex;
    gap: 10px;
    cursor: pointer;
  }
  background-color: white;
  border-radius: 10px;
`;
