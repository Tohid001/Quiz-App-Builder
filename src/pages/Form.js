import React, { useState, useEffect, useCallback, createContext } from "react";

//import utility
import update from "immutability-helper";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//importing my components
import {} from "../Components";

///importing ui's
import { Button, Image, Radio, Checkbox, Space, Input, Modal } from "antd";
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

  const [quizeState, setQuizeState] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState(
    getCachedState(`selectedAanswers-${quizId}`) || []
  );
  const [showModal, setShowMoDal] = useState(false);
  const [finalScores, setFinalScores] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const { quizeText, quizeDescription, quizQuestions } = quizeState;

  const questionsWithAns = quizQuestions?.filter((question) => {
    return question.options.some((option) => option.isCorrect);
  });

  console.log({ selectedAnswers, quizeState, questionsWithAns });

  // useDidMountEffect(() => {
  //   console.log("first");
  //   setShowMoDal(true);
  // }, [finalScores]);

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

  useEffect(() => {
    const totalPoints = questionsWithAns?.reduce((sum, question) => {
      return sum + question.points;
    }, 0);
    setTotalPoints(totalPoints);
  }, [quizeState]);

  const singleSelectHandler = (quesTionId, optionId, questionType) => {
    console.log({ quesTionId, optionId });

    if (!selectedAnswers.length) {
      //////brand new
      console.log(" ////// brand new radio");
      setSelectedAnswers([
        { quesTionId, answer: [optionId], type: questionType },
      ]);
    } else {
      const temp = selectedAnswers?.findIndex(
        (answer) => answer.quesTionId === quesTionId
      );
      if (temp === -1) {
        //////adding
        console.log(" //////adding radio");
        setSelectedAnswers([
          ...selectedAnswers,
          { quesTionId, answer: [optionId], type: questionType },
        ]);
      } else {
        //////updating
        console.log("//////updating radio");
        setSelectedAnswers((prev) => {
          return prev?.map((answer) => {
            if (answer.quesTionId === quesTionId) {
              return { ...answer, answer: [optionId], type: questionType };
            }
            return answer;
          });
        });
      }
    }
  };

  const multiSelectHandler = (
    isChecked,
    quesTionId,
    optionId,
    questionType
  ) => {
    console.log({ quesTionId, optionId });

    if (!selectedAnswers.length) {
      ////// brand new
      console.log(" ////// brand new check");
      setSelectedAnswers([
        { quesTionId, answer: [optionId], type: questionType },
      ]);
    } else {
      const temp = selectedAnswers?.findIndex(
        (answer) => answer.quesTionId === quesTionId
      );
      if (temp === -1) {
        //////adding
        console.log(" //////adding check");
        setSelectedAnswers([
          ...selectedAnswers,
          { quesTionId, answer: [optionId], type: questionType },
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
                return {
                  ...object,
                  answer: [...object.answer, optionId],
                  type: questionType,
                };
              } else {
                //deselecting
                console.log("  //deselecting check");
                return {
                  ...object,
                  answer: object.answer.filter((prevOptionId) => {
                    return prevOptionId !== optionId;
                  }),
                  type: questionType,
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

  const scoreHandler = () => {
    const correctAnswersKey = questionsWithAns?.map((question) => {
      const correctOptions = question.options.filter(
        (option) => option.isCorrect
      );

      return {
        quesTionId: question.id,
        answer: correctOptions.map((option) => option.id),
        points: question.points,
        type: question.questionType,
      };
    });

    // console.log({ correctAnswersKey });

    const finalScore = correctAnswersKey.reduce((finalScore, correctAns) => {
      if (!selectedAnswers.length) {
        return finalScore;
      } else {
        const temp = selectedAnswers?.findIndex(
          (answer) => answer.quesTionId === correctAns.quesTionId
        );
        if (temp === -1) {
          return finalScore;
        } else {
          if (
            correctAns.type === "radio" &&
            selectedAnswers[temp].type === "radio"
          ) {
            const isCorrect = selectedAnswers[temp].answer.some((ans) =>
              correctAns.answer.includes(ans)
            );
            return isCorrect ? finalScore + correctAns.points : finalScore;
          }
          if (
            correctAns.type === "checkbox" &&
            selectedAnswers[temp].type === "checkbox"
          ) {
            const isCorrect = selectedAnswers[temp].answer.every((ans) =>
              correctAns.answer.includes(ans)
            );
            console.log("check", { isCorrect });
            return isCorrect ? finalScore + correctAns.points : finalScore;
          }
        }
      }
      return finalScore;
    }, 0);

    setFinalScores(finalScore);
    setShowMoDal(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    scoreHandler();
  };

  return (
    <StyleViewdForm onSubmit={submitHandler}>
      <Modal
        centered={true}
        maskClosable={false}
        maskStyle={{ background: "rgba(195, 198, 212,.8)" }}
        title={<h2>Quiz result</h2>}
        open={showModal}
        footer={
          <div>
            <Button
              type="primary"
              onClick={() => {
                setShowMoDal(false);
              }}
            >
              Take quiz again
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setShowMoDal(false);
                localStorage.removeItem(`selectedAanswers-${quizId}`);
                navigate("/", { replace: true });
              }}
            >
              Go to home page
            </Button>
          </div>
        }
        closable={false}
      >
        <h2>{`You have scored ${finalScores} points out of ${totalPoints}`}</h2>
      </Modal>
      <StyledHeaderSection>
        <h1>{quizeText}</h1>
        <p>{quizeDescription}</p>
      </StyledHeaderSection>
      <StyledViewQuesTionContainer>
        {questionsWithAns?.map(
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
                              singleSelectHandler(
                                qId,
                                e.target.value,
                                questionType
                              );
                            } else {
                              multiSelectHandler(
                                e.target.checked,
                                qId,
                                e.target.value,
                                questionType
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
