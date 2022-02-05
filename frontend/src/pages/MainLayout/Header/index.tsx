import * as React from "react";
import { Layout } from "antd";
import { UserInfo } from "./UserInfo";
import IUser from "types/user";
import { useStore } from "effector-react";
import { $user } from "../../../models/auth";

export const Header = () => {
  const currentUser = useStore($user);

  return (
    <Layout.Header className="site-header">
      <UserInfo currentUser={currentUser} />
    </Layout.Header>
  );
};
