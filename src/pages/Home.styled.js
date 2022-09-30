import styled from "styled-components";

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
  padding: 2em;
`;

export const StyledQuizCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2.5em;
  background-color: rgba(109, 233, 237, 0.5);
  border-radius: 10px;
  & small {
    padding-top: 1em;
    padding-bottom: 1em;
  }
  & div {
    &:nth-of-type(1) {
      & h4 {
        font-weight: bold;
        font-size: 30px;
        line-height: 1em;
      }
    }
    &:nth-of-type(2) {
    }
    &:nth-of-type(3) {
      & span {
        font-size: 24px;
        position: absolute;
        top: 0.25em;
        right: 0.25em;
        /* padding: 1em; */
        & a {
          all: unset;
          cursor: pointer;
        }
      }
    }
  }
`;
