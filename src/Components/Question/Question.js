import React from "react";
import { Button, Input, Space, Collapse } from "antd";

const { Panel } = Collapse;

function Question(props) {
  //   console.log({ question });
  const { id, questiontext, options } = props.question;
  return (
    <Panel {...props} header={<p>{`${id}. ${questiontext}`}</p>}>
      {options.map((option, index) => (
        <p>{option.optionText}</p>
      ))}
    </Panel>
  );
}

export default Question;
