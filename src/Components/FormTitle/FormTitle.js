import React from "react";
import { FormTitleContainer } from "./FormTitle.styled";
function FormTitle() {
  return (
    <FormTitleContainer>
      <label for="title">Quiz Title:</label>
      <br></br>
      <input type="text" name="title" id="text" />
    </FormTitleContainer>
  );
}

export default FormTitle;
