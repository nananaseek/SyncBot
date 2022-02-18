import * as React from "react";
import { Upload, message, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { fxUploadFile, fxUploadFileToServer } from "../../models/files";
import { useStore } from "effector-react";
import { $user } from "../../models/auth";
import { useCallback } from "react";

const { Dragger } = Upload;

export const UploadContainer = () => {
  const user = useStore($user);
  const loading = useStore(fxUploadFileToServer.pending);
  console.log(user);

  const handleChange = useCallback(
    async (info) => {
      console.log(info);
      await fxUploadFile({
        username: user.username,
        fileName: info.fileList[0].name,
        file: info.fileList[0].originFileObj,
      });
    },
    [user]
  );

  return (
    <Spin spinning={loading}>
      <Dragger
        multiple={false}
        name="file"
        onChange={handleChange}
        fileList={[]}
        beforeUpload={() => false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </Spin>
  );
};
