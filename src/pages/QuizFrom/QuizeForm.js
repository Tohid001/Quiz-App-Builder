import React, { useState, useEffect, useCallback } from "react";
//import utility
import update from "immutability-helper";
import { useParams } from "react-router-dom";

//importing my components
import { Question } from "../../Components";

///importing ui's
import { Button, Collapse, Input, Space, CollapsePanelProps } from "antd";
import { StyledForm, StyledQuestionSection } from "./Form.styled";

//importing dnd utilities
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//importing data
import { questions } from "../../constants";

const { Panel } = Collapse;

function QuizeForm() {
  const { formId } = useParams();
  const [questionsList, setQuestionList] = useState([...questions]);
  // console.log({ formId, questionsList });

  const sortQuestionHandler = useCallback((dragIndex, hoverIndex) => {
    // console.log("sortQuestionHandler called");
    setQuestionList((prevQuestions) =>
      update(prevQuestions, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevQuestions[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <StyledForm>
      <StyledQuestionSection>
        <Input type="text" placeholder="Untitled Quiz" />
        <Input type="text" placeholder="Quiz Description" />
      </StyledQuestionSection>
      <DndProvider backend={HTML5Backend}>
        <StyledQuestionSection>
          <Collapse
            style={{ background: "transparent" }}
            bordered={false}
            accordion
            onChange={(key) => {}}
          >
            {questionsList?.map((question, index) => (
              <Question
                key={question.id}
                question={question}
                sortQuestionHandler={sortQuestionHandler}
                index={index}
              />
            ))}
          </Collapse>
        </StyledQuestionSection>
      </DndProvider>
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
