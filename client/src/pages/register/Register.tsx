import { Layout } from "../../components/layout/Layout";
import { Row, Card, Form, Space, Typography } from "antd";
import { Input } from "../../components/input/Input";
import { PasswordInput } from "../../components/passwordInput/PasswordInput";
import { Button } from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useState } from "react";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      navigate("/");
    } catch (error) {
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
        <Card title="Регистрация" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <Input name="name" placeholder="Имя" />
            <Input type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Подтвердите пароль"
            />
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже зарегистрированы? <Link to={Paths.login}>Вход</Link>
            </Typography.Text>
          </Space>
          <ErrorMessage message={error}></ErrorMessage>
        </Card>
      </Row>
    </Layout>
  );
};
