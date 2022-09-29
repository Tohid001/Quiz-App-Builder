import React from "react";

import { Image } from "antd";
import { StyledImageContainer } from "./Question.styled";
import { DeleteFilled } from "@ant-design/icons";

function ImageComponent({
  width = "200px",
  height = "200px",
  src,
  onErrorHandler,
  deleteImageUrlHandler,
}) {
  return (
    <StyledImageContainer>
      <span
        onClick={() => {
          deleteImageUrlHandler();
        }}
      >
        <DeleteFilled />
      </span>
      <Image
        width={width}
        height={height}
        src={src}
        onError={() => {
          onErrorHandler();
          alert("there was an error occured loading the image!");
        }}
      />
    </StyledImageContainer>
  );
}

export default ImageComponent;
