import * as React from "react";
import { Image } from "antd";
import { useEffect } from "react";
import { $currentUserFiles, fxGetFileList } from "../../models/files";
import { $user } from "../../models/auth";
import { useStore } from "effector-react";

export const FilesList = () => {
  const currentUser = useStore($user);
  const files = useStore($currentUserFiles);
  useEffect(() => {
    fxGetFileList({ userId: currentUser.id });
  }, [JSON.stringify(currentUser)]);
  console.log(files);
  return <div></div>;
};
