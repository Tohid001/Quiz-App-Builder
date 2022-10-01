import React, { useState, useEffect, useRef } from "react";
import { Input, Space, Button, Select, Modal } from "antd";

function ModalComponent({ showModal, okHandler, cancelHandler, value, name }) {
  const [url, setUrl] = useState({ [name]: value });
  let refUrl = useRef(url[name]);

  // useEffect(() => {
  //   setUrl("");
  // }, []);
  // console.log(" state", url);
  return (
    <Modal
      centered={true}
      maskClosable={false}
      maskStyle={{ background: "rgba(195, 198, 212,.8)" }}
      title="By URL"
      open={showModal}
      onOk={() => {
        setUrl({ [name]: "" });
        okHandler(url);
      }}
      onCancel={() => {
        setUrl({ [name]: "" });
        cancelHandler();
      }}
    >
      <Input
        ref={refUrl}
        type="url"
        placeholder="Paste URL of image..."
        value={url[name]}
        name={name}
        onChange={(e) => {
          setUrl((prev) => {
            return { [e.target.name]: e.target.value };
          });
        }}
      />
    </Modal>
  );
}

export default ModalComponent;
