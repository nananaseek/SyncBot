import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { submitLoginFrom } from "../model";
import { useStore } from "effector-react";
import { fxLogin } from "../../../models/auth";
import { HOME } from "../../../api/urls";

export const LoginForm = () => {
  const loading = useStore(fxLogin.pending);

  const onFinish = (values: any) => {
    submitLoginFrom(values);
    setTimeout(() => {
      document.location.replace(HOME);
    }, 1000);
  };

  return (
    <div className="login-page-container">
      <Form
        name="normal_login"
        className="login-page-container-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
          Or <Link to="/registration">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
