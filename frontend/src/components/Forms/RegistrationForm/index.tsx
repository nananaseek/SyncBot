import { Button, Form, Input } from "antd";
import { useStore } from "effector-react";
import { $isAuth, fxRegister } from "../../../models/auth";

import * as React from "react";
import { useHistory } from "react-router";
import { submitRegisterFrom } from "../model";
import { useEffect } from "react";
import { HOME } from "../../../api/urls";

export const RegistrationForm = () => {
  const history = useHistory();

  const authSuccess = useStore($isAuth);
  const loading = useStore(fxRegister.pending);

  const onFinish = (values: any) => {
    submitRegisterFrom(values);
  };

  useEffect(() => {
    if (authSuccess) {
      history.push({ pathname: HOME });
    }
  }, [authSuccess]);

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
