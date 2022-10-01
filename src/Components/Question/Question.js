import React, { useRef, useEffect, useContext } from "react";
import { qizContext } from "../../pages/QuizFrom/QuizeForm";

//import components
import QuestionHeader from "./QuestionHeader";
import OptionComponent from "./Option";
import Options from "./Options";

//import ui's
import { StyledQuesTionContainer, StyledRibbon } from "./Question.styled";
import { Button, Input, Space, Collapse, Tooltip, Image } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

//importing dnd utilities
import { ItemTypes } from "../../constants";
import { useDrag, useDrop } from "react-dnd";

//destructing necessary things
const { QUESTION } = ItemTypes;
const { Panel } = Collapse;

const styles = {
  position: "absolute",
  borderRadius: "50%",
  aspectRatio: "1/1",
  padding: "0px",
  left: -50,
};

//********COMPONENT DEFINITION*******
function Question(props) {
  const {
    sortQuestionHandler,
    expandedQuestion,
    addQuestionHandler,
    updateQuestionHandler,
    deleteQuestionHandler,
  } = useContext(qizContext);
  const { id, questiontext, options, questionType, questionimageUrl, points } =
    props.question;
  const { index } = props;
  // console.log({ expandedQuestion, id, index });
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: QUESTION,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      sortQuestionHandler(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: QUESTION,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const antdProps = { ...props };
  return (
    <StyledQuesTionContainer
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <Tooltip placement="top" title="Add a question">
        <Button
          type="primary"
          style={{
            ...styles,
            left: -50,
            display: `${expandedQuestion === id ? "block" : "none"}`,
          }}
          onClick={() => {
            addQuestionHandler(id);
          }}
        >
          <PlusOutlined />
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="Delete question">
        <Button
          type="primary"
          style={{
            ...styles,
            bottom: 0,
            display: `${expandedQuestion === id ? "block" : "none"}`,
          }}
          onClick={() => {
            deleteQuestionHandler(id);
          }}
        >
          <DeleteOutlined />
        </Button>
      </Tooltip>

      <Panel
        {...props}
        // showArrow={false}
        header={<QuestionHeader serial={index + 1} question={props.question} />}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="points">Points:</label>
          <input
            style={{ width: "50px" }}
            id="points"
            type="number"
            min={0}
            value={points}
            onChange={(e) => {
              updateQuestionHandler(id, { points: parseInt(e.target.value) });
            }}
          />
        </div>
        <Options
          options={options}
          questionId={id}
          questionType={questionType}
        />
        <div></div>
      </Panel>
    </StyledQuesTionContainer>
  );
}

export default Question;
