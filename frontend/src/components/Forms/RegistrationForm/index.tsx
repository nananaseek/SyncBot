import { Button, Form, Input } from "antd";
import { useStore } from "effector-react";
import { fxRegister } from "../../../models/auth";

import * as React from "react";
import { submitRegisterFrom } from "../model";
import { HOME } from "../../../api/urls";

export const RegistrationForm = () => {
  const loading = useStore(fxRegister.pending);

  const onFinish = (values: any) => {
    submitRegisterFrom(values);
    setTimeout(() => {
      document.location.replace(HOME);
    }, 1000);
  };

  return (
    <div className="registration-page-container">
      <Form
        name="registration"
        className="registration-page-container-form"
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
            loading={loading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
