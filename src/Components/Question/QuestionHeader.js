import React, { useState, useEffect, useContext } from "react";
import { qizContext } from "../../pages/QuizFrom/QuizeForm";

import ModalComponent from "./Modal";
import ImageComponent from "./Image";
import { Input, Select } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { StyledQuestionHeader } from "./Question.styled";

const { Option } = Select;

function QuestionHeader({ question, serial }) {
  const { updateQuestionHandler } = useContext(qizContext);
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

  // console.log({ questionHeaderStates });

  const [showModal, setShowMoDal] = useState(false);

  const handleQuestionHeaderChange = (e) => {
    setQuestionHeaderStates((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const okHandler = (payload) => {
    setQuestionHeaderStates((prev) => {
      return { ...prev, ...payload };
    });
    setShowMoDal(false);
  };

  const cancelHandler = () => {
    setShowMoDal(false);
  };

  const deleteImageUrlHandler = () => {
    setQuestionHeaderStates((prev) => {
      return { ...prev, questionimageUrl: "" };
    });
    alert("deleted the imageURL");
  };

  useEffect(() => {
    updateQuestionHandler(id, questionHeaderStates);
  }, [questionHeaderStates]);

  return (
    <>
      <StyledQuestionHeader>
        <ModalComponent
          showModal={showModal}
          okHandler={okHandler}
          cancelHandler={cancelHandler}
          value={questionimageUrlState}
          name="questionimageUrl"
        />
        <Input
          addonBefore={<label>{`${serial}.`}</label>}
          placeholder="Untitled Question"
          name="questiontext"
          value={questiontextState}
          onChange={handleQuestionHeaderChange}
        />

        <div>
          <span
            onClick={() => {
              setShowMoDal(true);
            }}
          >
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
      {questionimageUrl && (
        <ImageComponent
          src={questionimageUrl}
          onErrorHandler={deleteImageUrlHandler}
          deleteImageUrlHandler={deleteImageUrlHandler}
        />
      )}
    </>
  );
}

export default QuestionHeader;
