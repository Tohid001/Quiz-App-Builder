import React, { useState, useEffect } from "react";

import { Input, Space, Button, Select } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { StyledQuestionHeader } from "./Question.styled";

const { Option } = Select;

function QuestionHeader({ question, serial, updateQuestionHandler }) {
  const { id, questiontext, options, questionType, questionimageUrl } =
    question;
  //   console.log({ question });
  const [questionHeaderStates, setQuestionHeaderStates] = useState({
    questiontext,
    questionType,
    questionimageUrl,
  });

  const {
    questiontext: questiontextState,
    questionType: questionTypeState,
    questionimageUrl: questionimageUrlState,
  } = questionHeaderStates;

  console.log({ questionHeaderStates });

  const handleQuestionHeaderChange = (e) => {
    setQuestionHeaderStates((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    updateQuestionHandler(id, questionHeaderStates);
  }, [questionHeaderStates]);

  return (
    <StyledQuestionHeader>
      <Input
        addonBefore={<label>{`${serial}.`}</label>}
        placeholder="Untitled Question"
        name="questiontext"
        value={questiontextState}
        onChange={handleQuestionHeaderChange}
      />

      <div>
        <span>
          <PictureOutlined />
        </span>
      </div>
      <div>
        <Select
          defaultValue="radio"
          value={questionTypeState}
          name="questionType"
          onChange={(value) => {
            setQuestionHeaderStates((prev) => {
              return { ...prev, questionType: value };
            });
          }}
        >
          <Option value="radio">Single selection</Option>
          <Option value="checkbox">Multiple selection</Option>
        </Select>
      </div>
    </StyledQuestionHeader>
  );
}

export default QuestionHeader;
