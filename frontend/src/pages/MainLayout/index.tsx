import { Layout } from "antd";
import * as React from "react";
import { Content } from "./Content";
import { Header } from "./Header";

import "./index.less";

const MainLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header />
      <Content>{children}</Content>
      <Layout.Footer className="footer">
        Anton Migaichuk ©{new Date().getFullYear()}
      </Layout.Footer>
    </Layout>
  );
};

export default MainLayout;
