import React, { useState, useEffect, useContext } from "react";
import { qizContext } from "../../pages/QuizFrom/QuizeForm";
import OptionComponent from "./Option";

import useDidMountEffect from "../../Hooks/úseDIdMount";
import { Button } from "antd";
import { newOption } from "../../constants";

function Options({ options, questionId, questionType }) {
  const { updateQuestionHandler } = useContext(qizContext);
  const [currentOptions, setCurrentOptions] = useState(options);

  useDidMountEffect(() => {
    updateQuestionHandler(questionId, { options: currentOptions });
  }, [currentOptions]);

  const updateOptionsHandler = (optionIndex, payload) => {
    setCurrentOptions((prev) => {
      return prev.map((option, index) => {
        if (index === optionIndex) {
          return { ...option, ...payload };
        }
        return option;
      });
    });
  };

  const deleteOptionHandler = (optionIndex) => {
    setCurrentOptions(
      currentOptions.filter((option, index) => {
        return !(index === optionIndex);
      })
    );
  };

  return (
    <>
      <h4>options:</h4>
      {options.map((option, index) => (
        <OptionComponent
          key={index}
          option={option}
          index={index}
          questionId={questionId}
          questionType={questionType}
          totalOptions={options.length}
          updateOptionsHandler={updateOptionsHandler}
          deleteOptionHandler={deleteOptionHandler}
        />
      ))}
      <div
        style={{ display: "flex", justifyContent: "center", padding: "1em" }}
      >
        <Button
          size="large"
          type="primary"
          onClick={() => {
            setCurrentOptions([...currentOptions, newOption]);
          }}
        >
          Add option
        </Button>
      </div>
    </>
  );
}

export default Options;
