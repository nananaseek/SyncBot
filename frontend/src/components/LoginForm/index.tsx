import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { submitFrom } from "./model";
import { useStore } from "effector-react";
import { $isAuth } from "../../models/auth";

export const LoginForm = () => {
  const history = useHistory();
  const authSuccess = useStore($isAuth);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    submitFrom(values);
    if (authSuccess) {
      history.push({ pathname: "/files" });
    }
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
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/registration">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
