import React, { useState, useEffect, useContext } from "react";
import { qizContext } from "../../pages/QuizFrom/QuizeForm";

import ModalComponent from "./Modal";
import ImageComponent from "./Image";
import { Input } from "antd";
import { PictureOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { StyledQuestionHeader } from "./Question.styled";
import useDidMountEffect from "../../Hooks/úseDIdMount";

function OptionComponent({
  option,
  index,
  deleteOptionHandler,
  updateOptionsHandler,
  totalOptions,
  questionType,
  questionId,
}) {
  const { optionImageUrl, optionText, isCorrect } = option;

  const [optionStates, setOptionStates] = useState({
    optionText,
    optionImageUrl,
    isCorrect,
  });
  const {
    optionText: optionTextState,

    optionImageUrl: optionImageUrlState,
    isCorrect: isCorrectState,
  } = optionStates;

  console.log({ ...optionStates, index });

  const [showModal, setShowMoDal] = useState(false);

  // useEffect(() => {
  //   updateOptionsHandler(index, optionStates);
  // }, [optionStates]);

  useDidMountEffect(() => {
    updateOptionsHandler(index, optionStates);
  }, [optionStates]);

  const handleOptionChange = (e) => {
    // console.log("e", e.target.name);
    setOptionStates((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const okHandler = (payload) => {
    setOptionStates((prev) => {
      return { ...prev, ...payload };
    });
    setShowMoDal(false);
  };

  const cancelHandler = () => {
    setShowMoDal(false);
  };

  const deleteImageUrlHandler = () => {
    alert("deleting the imageURL");
    setOptionStates((prev) => {
      return { ...prev, optionImageUrl: "" };
    });
  };
  const correctAnswerHandler = (isCorrect) => {
    setOptionStates((prev) => {
      return { ...prev, isCorrect };
    });
  };

  const disableDeleteButton = totalOptions > 2;

  return (
    <>
      <StyledQuestionHeader>
        <ModalComponent
          showModal={showModal}
          okHandler={okHandler}
          cancelHandler={cancelHandler}
          value={optionImageUrlState}
          name="optionImageUrl"
        />
        <Input
          addonBefore={
            <input
              type={questionType}
              checked={isCorrect}
              name={`question-${questionId}`}
              value={optionTextState}
              onChange={(e) => {
                console.log(e.target.value);
                if (questionType == "checkbox") {
                  console.log("cb", index, e.target.checked);
                  correctAnswerHandler(e.target.checked);
                } else {
                  console.log("it's a radio");
                  console.log("radio", e.target.checked);
                  correctAnswerHandler(e.target.checked);
                }
              }}
            />
          }
          placeholder={`option ${index + 1}`}
          name="optionText"
          value={optionTextState}
          onChange={handleOptionChange}
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
        <button
          onClick={() => {
            deleteOptionHandler(index);
          }}
          disabled={!disableDeleteButton}
          style={{
            fontSize: "24px",
            padding: "5px",
            cursor: "pointer",

            border: "none",
            outline: "none",
            background: `${!disableDeleteButton ? "gray" : "transparent"}`,
          }}
        >
          <CloseCircleOutlined />
        </button>
      </StyledQuestionHeader>
      {optionImageUrl && (
        <ImageComponent
          src={optionImageUrl}
          onErrorHandler={deleteImageUrlHandler}
          deleteImageUrlHandler={deleteImageUrlHandler}
        />
      )}
    </>
  );
}

export default OptionComponent;
