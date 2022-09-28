import React from "react";
import { HeaderContainer, AddQuizButton } from "./Header.styled";
import { IoIosAdd } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

function Header() {
  return (
    <HeaderContainer>
      <div>
        <h4>Create a new Quiz:</h4>
        <AddQuizButton to={`form/${uuidv4()}`}>
          <IoIosAdd size="2rem" />
        </AddQuizButton>
      </div>
    </HeaderContainer>
  );
}

export default Header;
