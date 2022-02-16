import { Avatar, Dropdown, Menu } from "antd";
import * as React from "react";
import { UserOutlined } from "@ant-design/icons";
import IUser from "types/user";
import { fxLogout } from "../../../models/auth";
import { useHistory } from "react-router-dom";

interface UserInfoProps {
  currentUser: IUser;
}

export const UserInfo: React.FC<UserInfoProps> = ({ currentUser }) => {
  const handleLogoutClick = async ({ key, domEvent }) => {
    domEvent.preventDefault();
    if (key === "2") {
      await fxLogout().then(() => {
        document.location.reload();
      });
    }
  };

  const menu = (
    <Menu className="user-menu" onClick={handleLogoutClick}>
      <Menu.ItemGroup key="1">
        <span
          dangerouslySetInnerHTML={{
            __html: `<b>${currentUser.username}</b><br/>${currentUser.email}`,
          }}
        />
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item key="2" className="user-menu--logout">
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
