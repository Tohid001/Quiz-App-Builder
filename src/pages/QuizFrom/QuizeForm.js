import React, { useState, useEffect, useCallback, createContext } from "react";

//import utility
import update from "immutability-helper";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useDidMountEffect from "../../Hooks/úseDIdMount";

//importing my components
import { Question } from "../../Components";

///importing ui's
import { Button, Collapse, Input, Space, CollapsePanelProps } from "antd";
import { StyledForm, StyledQuestionSection } from "./Form.styled";

//importing dnd utilities
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//importing data
import { initialQuizState, newQuestion } from "../../constants";

// import { v4 as uuidv4 } from "uuid";
import getCachedState from "../../utils/getCachedState";

export const qizContext = createContext(null);

//********COMPONENT DEFINITION*******
function QuizeForm() {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [quizeFormStates, setQuizeFormStates] = useState(
    getCachedState(formId) || initialQuizState
  );

  console.log({ quizeFormStates });

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

  // console.log({ defaultActiveKey, expandedQuestion });

  useEffect(() => {
    localStorage.setItem(formId, JSON.stringify(quizeFormStates));
  }, [quizeFormStates]);

  useEffect(() => {
    try {
      const localQuizList = getCachedState("quizes");
      console.log({ localQuizList });
      const quizLocalIndex =
        localQuizList &&
        localQuizList.findIndex((quiz, index) => {
          return quiz.id === formId;
        });

      console.log({ quizLocalIndex });

      if (quizLocalIndex !== -1 || quizLocalIndex == 0) {
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
    const quizes = getCachedState("quizes");
    if (quizes) {
      const existingFormIndex = quizes?.findIndex((quiz, index) => {
        return quiz.id === formId;
      });
      if (existingFormIndex !== -1) {
        localStorage.setItem(
          "quizes",
          JSON.stringify(
            quizes.map((quiz, index) => {
              if (quiz.id === formId) {
                return { ...quizeFormStates };
              }
            })
          )
        );
      } else {
        localStorage.setItem(
          "quizes",
          JSON.stringify([...quizes, { ...quizeFormStates, id: formId }])
        );
      }
    } else {
      console.log("new");
      localStorage.setItem(
        "quizes",
        JSON.stringify([{ ...quizeFormStates, id: formId }])
      );
    }
    localStorage.removeItem(formId);
    navigate("/");
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
    // setDefaultActiveKey(newQuestions.length);
  };

  const deleteQuestionHandler = (questionId) => {
    setQuizeFormStates((prev) => {
      return {
        ...prev,
        quizQuestions: prev.quizQuestions.filter((question) => {
          return !(question.id.toString() === questionId.toString());
        }),
      };
    });
  };

  const updateQuestionHandler = (questionId, payload) => {
    setQuizeFormStates((prev) => {
      return {
        ...prev,
        quizQuestions: prev.quizQuestions.map((question) => {
          if (question.id.toString() === questionId.toString()) {
            return { ...question, ...payload };
          }
          return question;
        }),
      };
    });
  };

  return (
    <qizContext.Provider
      value={{
        quizeFormStates,
        addQuestionHandler,
        deleteQuestionHandler,
        sortQuestionHandler,
        updateQuestionHandler,
        defaultActiveKey,
        expandedQuestion,
      }}
    >
      <StyledForm onSubmit={submitHandler}>
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
                <Question key={question.id} question={question} index={index} />
              ))}
            </Collapse>
          </StyledQuestionSection>
        </DndProvider>
        <Button size="large" type="primary" htmlType="submit">
          Save Changes
        </Button>
      </StyledForm>
    </qizContext.Provider>
  );
}

export default QuizeForm;
