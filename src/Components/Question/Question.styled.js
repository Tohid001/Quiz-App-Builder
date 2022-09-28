import styled from "styled-components";

export const StyledQuesTionContainer = styled.div`
  /* padding: 1em; */
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
  z-index: 2;
  margin-bottom: calc(1em + 20px);

  &::before {
    content: "?";
    position: absolute;
    left: 0;
    right: 0;
    height: 20px;
    top: -20px;
    background-color: rgba(161, 240, 178);
    font-weight: bold;
    font-family: "Inter", sans-serif;
    display: grid;
    justify-content: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    z-index: -1;
  }

  //found a way around to fix the layout of panel header-antd@4.23.2
  & .ant-collapse-header {
    display: flex;
    gap: 10px;
    cursor: pointer;
    /* height: 50px; */
  }
`;
