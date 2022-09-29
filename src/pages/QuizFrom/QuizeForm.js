import React, { useState, useEffect, useCallback } from "react";

//import utility
import update from "immutability-helper";
import { useParams } from "react-router-dom";

//importing my components
import { Question } from "../../Components";

///importing ui's
import { Button, Collapse, Input, Space, CollapsePanelProps } from "antd";
import {
  StyledForm,
  StyledQuestionSection,
  StledAddQuestionButton,
} from "./Form.styled";

//importing dnd utilities
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//importing data
import { initialQuizState } from "../../constants";

import { newQuestion } from "../../constants";
import { v4 as uuidv4 } from "uuid";

const getCachedState = (key) => {
  const cachedState =
    localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
  return cachedState;
};

//********COMPONENT DEFINITION*******
function QuizeForm() {
  const { formId } = useParams();

  const [quizeFormStates, setQuizeFormStates] = useState(
    getCachedState(formId) || initialQuizState
  );

  const { quizQuestions, quizeDescription, quizeText } = quizeFormStates;

  const openedQuestionIndex = quizQuestions?.findIndex((question, index) => {
    return question.open;
  });

  const [expandedQuestion, setExpandedQuestion] = useState(
    quizQuestions[openedQuestionIndex].id.toString()
  );

  const [defaultActiveKey, setDefaultActiveKey] = useState(
    quizQuestions[openedQuestionIndex].id
  );

  console.log({ defaultActiveKey, expandedQuestion });

  useEffect(() => {
    try {
      const localQuizList = getCachedState("quizes");
      const quizLocalIndex =
        localQuizList &&
        localQuizList?.findIndex((quiz, index) => {
          return quiz.id === formId;
        });

      if (quizLocalIndex) {
        console.log("test6>>>opened an existing form");

        setQuizeFormStates(localQuizList[quizLocalIndex]);
        localStorage.setItem(
          formId,
          JSON.stringify(localQuizList[quizLocalIndex])
        );
      }
    } catch (error) {
      console.log({ error, stack: error.stack });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(formId, JSON.stringify(quizeFormStates));
  }, [quizeFormStates]);

  const sortQuestionHandler = useCallback((dragIndex, hoverIndex) => {
    setQuizeFormStates((prevQuizState) => ({
      ...prevQuizState,
      quizQuestions: [
        ...update([...prevQuizState.quizQuestions], {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevQuizState.quizQuestions[dragIndex]],
          ],
        }),
      ],
    }));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem(formId);
  };

  const handleQuizChange = (e) => {
    setQuizeFormStates({ ...quizeFormStates, [e.target.name]: e.target.value });
  };

  const addQuestionHandler = (index) => {
    const newQuestions = [...quizQuestions];
    newQuestions.splice(index + 1, 0, {
      ...newQuestion,
      id: quizQuestions?.length + 1,
    });

    setQuizeFormStates((prevQuizState) => {
      return {
        ...prevQuizState,
        quizQuestions: newQuestions.map((question) => {
          if (question.id.toString() === defaultActiveKey.toString()) {
            console.log("closed", question.id);
            return { ...question, open: false };
          }
          return question;
        }),
      };
    });
    setDefaultActiveKey(newQuestions.length);

    // setDefaultActiveKey(1);
  };

  return (
    <StyledForm>
      <StyledQuestionSection>
        <Input
          type="text"
          placeholder="Untitled Quiz"
          value={quizeText}
          onChange={handleQuizChange}
          name="quizeText"
        />
        <Input.TextArea
          placeholder="Quiz Description"
          value={quizeDescription}
          rows={4}
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={handleQuizChange}
          name="quizeDescription"
        />
      </StyledQuestionSection>

      <DndProvider backend={HTML5Backend}>
        <StyledQuestionSection>
          <Collapse
            style={{ background: "transparent" }}
            bordered={false}
            accordion
            onChange={(key) => {
              console.log({ key });
              setExpandedQuestion(key);
            }}
            defaultActiveKey={defaultActiveKey}
            // activeKey={defaultActiveKey}
          >
            {quizeFormStates?.quizQuestions?.map((question, index) => (
              <Question
                key={question.id}
                question={question}
                sortQuestionHandler={sortQuestionHandler}
                index={index}
                expandedQuestion={expandedQuestion}
                addQuestionHandler={addQuestionHandler}
              />
            ))}
          </Collapse>
        </StyledQuestionSection>
      </DndProvider>
    </StyledForm>
  );
}

export default QuizeForm;
