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

  const [answers, setAnswers] = useState(
    getCachedState(`view-${quizId}`) || []
  );

  const [quizeState, setQuizeState] = useState({});

  const { quizeText, quizeDescription, quizQuestions } = quizeState;

  console.log({ answers, quizeState });

  useEffect(() => {
    localStorage.setItem(`view-${quizId}`, JSON.stringify(answers));
  }, [answers]);

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
                {questionType === "radio" ? (
                  <Radio.Group
                    onChange={(e) => {
                      console.log({ Group: "radio", e });
                    }}
                  >
                    <Space direction="vertical">
                      {options?.map(
                        (
                          { optionText, optionImageUrl, isCorrect, id },
                          index
                        ) => {
                          return (
                            <Radio
                              key={id}
                              value={optionText}
                              onChange={(e) => {
                                console.log({ item: "radio", e });
                              }}
                            >
                              <div>
                                <p>{optionText}</p>
                                {optionImageUrl && (
                                  <Image
                                    width={200}
                                    src={optionImageUrl}
                                    preview={false}
                                  />
                                )}
                              </div>
                            </Radio>
                          );
                        }
                      )}
                    </Space>
                  </Radio.Group>
                ) : (
                  <Checkbox.Group
                    onChange={(e) => {
                      console.log({ Group: "checkbox", e });
                    }}
                  >
                    <Space direction="vertical">
                      {options?.map(
                        (
                          { optionText, optionImageUrl, isCorrect, id },
                          index
                        ) => {
                          return (
                            <Checkbox
                              key={id}
                              value={optionText}
                              onChange={(e) => {
                                console.log({ item: "checkbox", e });
                              }}
                            >
                              <div>
                                <p>{optionText}</p>
                                {optionImageUrl && (
                                  <Image
                                    width={200}
                                    src={optionImageUrl}
                                    preview={false}
                                  />
                                )}
                              </div>
                            </Checkbox>
                          );
                        }
                      )}
                    </Space>
                  </Checkbox.Group>
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
