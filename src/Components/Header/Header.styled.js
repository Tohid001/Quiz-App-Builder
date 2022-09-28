import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
  position: sticky;
  top: 0;
  background-color: rgba(159, 173, 196, 1);
  & div {
    display: flex;
    flex-direction: column;
    gap: 1em;
    & > a {
      align-self: center;
    }
  }
`;

export const AddQuizButton = styled(NavLink)`
  all: unset;
  cursor: pointer;
  display: grid;
  place-items: center;
  width: 2rem;
  aspect-ratio: 1;
  padding: 1em;
  font-size: 1rem;
  background: rgba(237, 218, 2, 0.75);
  color: black;
  &:hover {
    transform: scale(1.1);
  }
  z-index: 100;
`;
