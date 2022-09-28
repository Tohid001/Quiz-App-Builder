import React, { useRef, useEffect } from "react";
import { Button, Input, Space, Collapse } from "antd";

//import ui's
import { StyledQuesTionContainer } from "./Question.styled";

const { Panel } = Collapse;

function Question(props) {
  const ref = useRef(null);
  useEffect(() => {
    console.log(ref.current);
  });
  //   console.log({ question });
  const { id, questiontext, options } = props.question;
  const antdProps = { ...props, ref };
  return (
    // <div>
    //   <Panel {...props} header={<p>{`${id}. ${questiontext}`}</p>}>
    //     {options.map((option, index) => (
    //       <p ref={ref}>{option.optionText}</p>
    //     ))}
    //   </Panel>
    // </div>
    <StyledQuesTionContainer>
      <Panel {...antdProps} header={<p>{`${id}. ${questiontext}`}</p>}>
        {options.map((option, index) => (
          <p>{option.optionText}</p>
        ))}
      </Panel>
    </StyledQuesTionContainer>
  );
}

export default Question;
