import React, { useState, useEffect, useCallback, createContext } from "react";

//import utility
import update from "immutability-helper";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//importing my components
import {} from "../Components";

///importing ui's
import { Button, Image, Radio, Checkbox, Space, Input } from "antd";
import {
  StyleViewdForm,
  StyledHeaderSection,
  StyledViewQuesTionContainer,
  StyledViewQuesTionItem,
  StyledViewQuestionHeader,
  StyledViewOptionsContainer,
} from "./Form.styled";

//importing utilities
import useDidMountEffect from "../Hooks/úseDIdMount";
import { v4 as uuidv4 } from "uuid";
import getCachedState from "../utils/getCachedState";

// export const formContext = createContext(null);

function Form() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [selectedAnswers, setSelectedAnswers] = useState(
    getCachedState(`selectedAanswers-${quizId}`) || []
  );

  const [quizeState, setQuizeState] = useState({});

  const { quizeText, quizeDescription, quizQuestions } = quizeState;

  console.log({ selectedAnswers, quizeState });

  useEffect(() => {
    localStorage.setItem(
      `selectedAanswers-${quizId}`,
      JSON.stringify(selectedAnswers)
    );
  }, [selectedAnswers]);

  useEffect(() => {
    const localQuizList = getCachedState("quizes");

    if (localQuizList) {
      const quizLocalIndex = localQuizList.findIndex((quiz, index) => {
        return quiz.id === quizId;
      });

      if (quizLocalIndex !== -1) {
        setQuizeState(localQuizList[quizLocalIndex]);
      } else {
      }
    } else {
    }
  }, []);

  const singleSelectHandler = (quesTionId, optionId) => {
    console.log({ quesTionId, optionId });

    if (!selectedAnswers.length) {
      //////brand new
      console.log(" ////// brand new radio");
      setSelectedAnswers([{ quesTionId, answer: [optionId] }]);
    } else {
      const temp = selectedAnswers?.findIndex(
        (answer) => answer.quesTionId === quesTionId
      );
      if (temp === -1) {
        //////adding
        console.log(" //////adding radio");
        setSelectedAnswers([
          ...selectedAnswers,
          { quesTionId, answer: [optionId] },
        ]);
      } else {
        //////updating
        console.log("//////updating radio");
        setSelectedAnswers((prev) => {
          return prev?.map((answer) => {
            if (answer.quesTionId === quesTionId) {
              return { ...answer, answer: [optionId] };
            }
            return answer;
          });
        });
      }
    }
  };

  const multiSelectHandler = (isChecked, quesTionId, optionId) => {
    console.log({ quesTionId, optionId });

    if (!selectedAnswers.length) {
      ////// brand new
      console.log(" ////// brand new check");
      setSelectedAnswers([{ quesTionId, answer: [optionId] }]);
    } else {
      const temp = selectedAnswers?.findIndex(
        (answer) => answer.quesTionId === quesTionId
      );
      if (temp === -1) {
        //////adding
        console.log(" //////adding check");
        setSelectedAnswers([
          ...selectedAnswers,
          { quesTionId, answer: [optionId] },
        ]);
      } else {
        //////updating
        console.log("//////updating check");

        const tempFilteredAnswersArray = selectedAnswers
          ?.map((object) => {
            if (object.quesTionId === quesTionId) {
              if (isChecked) {
                //adding another check
                console.log(" //adding another check");
                return { ...object, answer: [...object.answer, optionId] };
              } else {
                //deselecting
                console.log("  //deselecting check");
                return {
                  ...object,
                  answer: object.answer.filter((prevOptionId) => {
                    return prevOptionId !== optionId;
                  }),
                };
              }
            }
            return object;
          })
          .filter((object) => {
            return object.answer.length;
          });
        setSelectedAnswers((prev) => {
          return tempFilteredAnswersArray;
        });
      }
    }
  };

  const isCheckedHandler = (questionType, quesTionId, optionId) => {
    if (!selectedAnswers.length) {
      return false;
    } else {
      const temp = selectedAnswers?.findIndex(
        (answer) => answer.quesTionId === quesTionId
      );
      if (temp === -1) {
        return false;
      } else {
        if (questionType === "radio") {
          return selectedAnswers[temp].answer[0] === optionId;
        } else {
          return selectedAnswers[temp].answer.includes(optionId);
        }
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    localStorage.removeItem(`view-${quizId}`);
    // navigate("/", { replace: true });
  };

  return (
    <StyleViewdForm onSubmit={submitHandler}>
      <StyledHeaderSection>
        <h1>{quizeText}</h1>
        <p>{quizeDescription}</p>
      </StyledHeaderSection>
      <StyledViewQuesTionContainer>
        {quizQuestions?.map(
          (
            {
              id: qId,
              questiontext,
              questionimageUrl,
              questionType,
              points,
              options,
            },
            index
          ) => (
            <StyledViewQuesTionItem key={qId}>
              <StyledViewQuestionHeader>
                <div>
                  <h2>{questiontext}</h2>
                  <span>{`*${points} points`}</span>
                </div>
                {questionimageUrl && (
                  <Image width={200} src={questionimageUrl} preview={false} />
                )}
              </StyledViewQuestionHeader>
              <StyledViewOptionsContainer>
                {options?.map(
                  (
                    { optionText, optionImageUrl, isCorrect, id: optionId },
                    index
                  ) => {
                    return (
                      <div key={optionId} style={{ padding: "1em" }}>
                        <input
                          checked={isCheckedHandler(
                            questionType,
                            qId,
                            optionId
                          )}
                          type={questionType}
                          name={qId}
                          value={optionId}
                          onChange={(e) => {
                            if (questionType === "radio") {
                              singleSelectHandler(qId, e.target.value);
                            } else {
                              multiSelectHandler(
                                e.target.checked,
                                qId,
                                e.target.value
                              );
                            }
                          }}
                          style={{
                            display: "tableCell",
                            verticalAlign: "middle",
                            cursor: "pointer",
                          }}
                        />
                        <span style={{ marginLeft: ".8em" }}>{optionText}</span>
                        <div>
                          {optionImageUrl && (
                            <Image
                              width={200}
                              src={optionImageUrl}
                              preview={false}
                              style={{ marginTop: ".8em", marginLeft: ".8em" }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </StyledViewOptionsContainer>
            </StyledViewQuesTionItem>
          )
        )}
      </StyledViewQuesTionContainer>

      <Button size="large" type="primary" htmlType="submit">
        Submit
      </Button>
    </StyleViewdForm>
  );
}

export default Form;
