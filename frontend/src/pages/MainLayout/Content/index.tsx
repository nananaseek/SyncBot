import { Layout } from "antd";
import * as React from "react";

export const Content = ({ children }) => {
  return (
    <>
      <Layout.Content className="content-layout">
        <div className="content-layout--main">
          <main>{children}</main>
        </div>
      </Layout.Content>
    </>
  );
};
