import * as React from "react";
import { Layout } from "antd";
import { UserInfo } from "./UserInfo";
import { ICurrentUser } from "types/user";

export const Header = () => {
  const user: ICurrentUser = {
    id: 1,
    name: "Іван",
    surname: "Дерда",
    email: "ivanderda1999@gmail.com",
  };
  return (
    <Layout.Header className="site-header">
      <UserInfo currentUser={user} />
    </Layout.Header>
  );
};
