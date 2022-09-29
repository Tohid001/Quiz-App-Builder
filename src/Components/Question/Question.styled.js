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
    /* display: flex; */
    /* gap: 10px; */
    /* cursor: pointer; */
    /* height: 50px; */
  }
`;

export const StyledRibbon = styled.div`
  position: absolute;
  top: 0;
  height: 0;
  left: 0;
  background-color: black;

  /* z-index: 20; */
`;

export const StyledQuestionHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  /* flex-wrap: wrap; */
  & div {
    &:nth-of-type(1) {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      padding: 5px;
    }
  }

  @media (min-width: 600px) {
    flex-direction: row;
    & input {
      flex-basis: 40%;
    }
    & div {
      &:nth-of-type(1) {
        flex-basis: 20%;
        padding: 0px;
        & span {
          cursor: pointer;
        }
      }
      &:nth-of-type(2) {
        flex-basis: 40%;
        & select {
          width: 100%;
        }
      }
    }
  }
`;

export const StyledImageContainer = styled.div`
  padding: 30px;
  position: relative;

  width: fit-content;
  & image {
    display: block;
    object-position: center;
    object-fit: cover;
    width: 200px;
    aspect-ratio: 1/1;
    z-index: -1;
  }
  & span {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    /* padding: 0.5em; */
    width: 30px;
    aspect-ratio: 1/1;
    z-index: 2;
    font-size: 24px;
    background-color: rgba(235, 9, 9, 0.3);
  }
`;
