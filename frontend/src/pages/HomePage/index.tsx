import MainLayout from "../MainLayout";
import * as React from "react";
import { FilesList } from "../../components/FilesList";

const HomePage = () => {
  return (
    <MainLayout>
      <h1>Content </h1>
      <FilesList />
    </MainLayout>
  );
};

export default HomePage;
