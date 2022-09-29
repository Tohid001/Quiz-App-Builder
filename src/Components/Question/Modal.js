import React, { useState, useEffect } from "react";
import { Input, Space, Button, Select, Modal } from "antd";

function ModalComponent({ showModal, okHandler, cancelHandler, value, name }) {
  const [url, setUrl] = useState({ [name]: value });

  console.log(" state", url);
  return (
    <Modal
      title="By URL"
      type="url"
      open={showModal}
      onOk={() => {
        // setUrl({ [name]: "" });
        okHandler(url);
      }}
      onCancel={() => {
        // setUrl({ [name]: "" });
        cancelHandler();
      }}
    >
      <Input
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
