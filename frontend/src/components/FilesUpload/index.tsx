import * as React from "react";
import { Modal, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { UploadContainer } from "./UploadContainer";
import { useStore } from "effector-react";
import { $showFileModal, setShowFileModal } from "../../models/files";

export const FileUploadButton = () => {
  const modalVisible = useStore($showFileModal);
  const handleClick = () => {
    setShowFileModal(true);
  };

  return (
    <>
      <Button type="primary" onClick={handleClick} icon={<UploadOutlined />}>
        Upload file
      </Button>
      <Modal
        title={null}
        centered
        footer={null}
        closable={false}
        visible={modalVisible}
        onCancel={() => {
          setShowFileModal(false);
        }}
      >
        <UploadContainer />
      </Modal>
    </>
  );
};
