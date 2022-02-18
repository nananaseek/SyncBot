import * as React from "react";
import { Image } from "antd";
import { useEffect } from "react";
import { $currentUserFiles, fxGetFileList } from "../../models/files";
import { $user } from "../../models/auth";
import { useStore } from "effector-react";

export const FilesList = () => {
  const files = useStore($currentUserFiles);

  useEffect(() => {
    fxGetFileList();
  }, []);

  return (
    <Image.PreviewGroup>
      <div className="images-group">
        {files.map((file, index) => (
          <Image key={index} width={300} src={file.file_uri} />
        ))}
      </div>
    </Image.PreviewGroup>
  );
};
