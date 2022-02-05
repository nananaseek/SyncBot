import { Avatar, Dropdown, Menu } from "antd";
import * as React from "react";
import { UserOutlined } from "@ant-design/icons";
import IUser from "types/user";

interface UserInfoProps {
  currentUser: IUser;
}

export const UserInfo: React.FC<UserInfoProps> = ({ currentUser }) => {
  const menu = (
    <Menu className="user-menu">
      <span key="0" className="user-menu--info">
        <span className="user-menu--info--name">{currentUser.username}</span>
        <span className="user-menu--info--email">{currentUser.email}</span>
      </span>
      <Menu.Item key="1" className="user-menu--logout">
        <span>Вийти</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="current-user">
      <span>{currentUser.username}</span>
      <Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
        <Avatar className="avatar" size={32} icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
};
