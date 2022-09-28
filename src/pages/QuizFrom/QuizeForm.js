import React, { useState, useEffect, Children } from "react";

import { useParams } from "react-router-dom";

//importing my components
import { Question } from "../../Components";

///importing ui's
import { Button, Collapse, Input, Space, CollapsePanelProps } from "antd";
import { StyledForm, StyledQuestionSection } from "./Form.styled";

//importing data
import { questions } from "../../constants";

const { Panel } = Collapse;

function QuizeForm() {
  const { formId } = useParams();
  const [questionsList, setQuestionsList] = useState([...questions]);
  console.log({ formId, questionsList });

  return (
    <StyledForm>
      <StyledQuestionSection>
        <Input type="text" placeholder="Untitled Quiz" />
        <Input type="text" placeholder="Quiz Description" />
      </StyledQuestionSection>

      <Collapse bordered={false} accordion onChange={(key) => {}}>
        {questions?.map((question, index) => (
          <Question key={question.id} question={question} />
        ))}
      </Collapse>
    </StyledForm>
  );
}

// const Demo = (props) => {
//   return (
//     <Panel
//       // {...CollapsePanelProps}
//       // header={"header"}
//       // key={index}
//       // forceRender
//       // // extra={genExtra()}
//       {...props}
//     >
//       hello
//     </Panel>
//   );
// };

export default QuizeForm;
