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
              id,
              questiontext,
              questionimageUrl,
              questionType,
              points,
              options,
            },
            index
          ) => (
            <StyledViewQuesTionItem>
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
                {/* {options?.map(
                  ({ optionText, optionImageUrl, isCorrects }, index) => {
                    return "s";
                  }
                )} */}
                {questionType === "radio" ? (
                  <Radio.Group onChange={() => {}} value={" sd"}>
                    <Space direction="vertical">
                      <Radio value={1}>Option A</Radio>
                      <Radio value={2}>Option B</Radio>
                      <Radio value={3}>Option C</Radio>
                      <Radio value={4}>
                        More...
                        {4 === 4 ? (
                          <Input
                            style={{
                              width: 100,
                              marginLeft: 10,
                            }}
                          />
                        ) : null}
                      </Radio>
                    </Space>
                  </Radio.Group>
                ) : (
                  <Checkbox.Group onChange={() => {}} value={" sd"}>
                    <Space direction="vertical">
                      <Checkbox value={1}>Option A</Checkbox>
                      <Checkbox value={2}>Option B</Checkbox>
                      <Checkbox value={3}>Option C</Checkbox>
                      <Checkbox value={4}>
                        More...
                        {4 === 4 ? (
                          <Input
                            style={{
                              width: 100,
                              marginLeft: 10,
                            }}
                          />
                        ) : null}
                      </Checkbox>
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
