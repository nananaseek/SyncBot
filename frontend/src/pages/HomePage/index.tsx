import MainLayout from "../MainLayout";
import * as React from "react";
import { FilesList } from "../../components/FilesList";
import { FileUploadButton } from "../../components/FilesUpload";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="page-header">
        <h1>Ваші файли </h1>
        <FileUploadButton />
      </div>
      <FilesList />
    </MainLayout>
  );
};

export default HomePage;
