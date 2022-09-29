import React, { useRef, useEffect } from "react";

//import ui's
import { StyledQuesTionContainer, StyledRibbon } from "./Question.styled";
import { Button, Input, Space, Collapse, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

//importing dnd utilities
import { ItemTypes } from "../../constants";
import { useDrag, useDrop } from "react-dnd";

//destructing necessary things
const { QUESTION } = ItemTypes;
const { Panel } = Collapse;

//********COMPONENT DEFINITION*******
function Question(props) {
  const { id, questiontext, options } = props.question;
  const { index, sortQuestionHandler, expandedQuestion, addQuestionHandler } =
    props;
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

  useEffect(() => {});
  //   console.log({ question });

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
            position: "absolute",
            borderRadius: "50%",
            aspectRatio: "1/1",
            padding: "0px",
            left: -50,
            display: `${expandedQuestion === id.toString() ? "block" : "none"}`,
          }}
          onClick={() => {
            addQuestionHandler(index);
          }}
        >
          <PlusOutlined />
        </Button>
      </Tooltip>

      <Panel {...antdProps} header={<p>{`${index + 1}. ${questiontext}`}</p>}>
        {options.map((option, index) => (
          <p key={index}>{option.optionText}</p>
        ))}
      </Panel>
    </StyledQuesTionContainer>
  );
}

export default Question;
