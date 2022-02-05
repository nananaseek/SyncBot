import { Avatar, Dropdown, Menu } from "antd";
import * as React from "react";
import { UserOutlined } from "@ant-design/icons";
import { ICurrentUser } from "types/user";

interface UserInfoProps {
  currentUser: ICurrentUser;
}

export const UserInfo: React.FC<UserInfoProps> = ({ currentUser }) => {
  const menu = (
    <Menu className="user-menu">
      <span key="0" className="user-menu--info">
        <span className="user-menu--info--name">{`${currentUser.name} ${currentUser.name}`}</span>
        <span className="user-menu--info--email">{currentUser.email}</span>
      </span>
      <Menu.Item key="1" className="user-menu--logout">
        <span>Вийти</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="current-user">
      <span>{`${currentUser.name} ${currentUser.surname}`}</span>
      <Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
        <Avatar className="avatar" size={32} icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
};
