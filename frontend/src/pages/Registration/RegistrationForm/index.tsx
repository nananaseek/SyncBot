import { Button, Form, Input } from "antd";

import * as React from "react";
import { useHistory } from "react-router";

export const RegistrationForm = () => {
  const history = useHistory();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    history.push({ pathname: "/" });
  };

  return (
    <div className="registration-page-container">
      <Form
        name="registration"
        className="registration-page-container-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="registration-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
