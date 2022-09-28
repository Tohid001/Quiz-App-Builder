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
import { questions, initialFormState } from "../../constants";

//********COMPONENT DEFINITION*******
function QuizeForm() {
  const [quizeFormStates, setQuizeFormStates] = useState({});

  const { formId } = useParams();
  const [questionsList, setQuestionList] = useState([...questions]);
  // console.log({ formId, questionsList });

  //**this effect will be called first */
  useEffect(() => {
    const localQuizeFormStates = JSON.parse(
      localStorage.getItem("quizeFormStates")
    );
    if (localQuizeFormStates) {
      localStorage.setItem("quizeFormStates", JSON.stringify(quizeFormStates));
    }
    return () => {};
  }, [quizeFormStates]);

  //**this effect will be called last */
  useEffect(() => {
    try {
      const localQuizList = JSON.parse(localStorage.getItem("quizes"));
      if (localQuizList) {
        //after retrieving the formstate for corresponding formId from the localStorage key of "quizes" now update the localState and  localStorage key of "quizeFormStates"  with the retrieved state
        console.log("1.opened an existing quiz");
        const quizLocalIndex = localQuizList?.findIndex((quiz, index) => {
          return quiz.id === formId;
        });
        if (quizLocalIndex !== -1) {
          console.log("2.opened an existing quiz");
          setQuizeFormStates(localQuizList[quizLocalIndex]);
          localStorage.setItem(
            "quizeFormStates",
            JSON.stringify(localQuizList[quizLocalIndex])
          );
        }
      } else {
        //retrieve the formstate from the localStorage key of "quizeFormStates"
        const localQuizeFormStates = JSON.parse(
          localStorage.getItem("quizeFormStates")
        );
        if (localQuizeFormStates) {
          //****updating the local state with retrieved value and will be used when we will reload the page***
          console.log("page reloading");
          setQuizeFormStates(localQuizeFormStates);
        } else {
          //****  set a new localStorage key of "quizeFormStates" and will be used when we will create a new quiz***
          console.log("creating a form");
          localStorage.setItem(
            "quizeFormStates",
            JSON.stringify(initialFormState)
          );
        }
      }
      return () => {
        localStorage.removeItem("quizeFormStates");
      };
    } catch (error) {
      console.log({ error });
    }
  }, []);

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

  const submitHandler = (e) => {
    e.preventDefault();
  };

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

export default QuizeForm;
