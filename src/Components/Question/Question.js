import React from "react";
import { Button, Input, Space } from "antd";

function Question({ question }) {
  //   console.log({ question });
  const { id, questiontext, options } = question;
  return (
    <div>
      {options.map((option, index) => (
        <p>{option.optionText}</p>
      ))}
    </div>
  );
}

export default Question;
