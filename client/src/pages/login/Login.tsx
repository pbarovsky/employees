import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Row, Card, Form, Space, Typography } from "antd";
import { Input } from "../../components/input/Input";
import { PasswordInput } from "../../components/passwordInput/PasswordInput";
import { Button } from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";

export const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState("");

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate("/");
    } catch (error) {
      console.log("err", error);
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Вход" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <Input type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрироваться</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
