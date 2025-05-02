import { Layout } from "../../components/layout/Layout";
import { Row, Card, Form, Space, Typography } from "antd";
import { Input } from "../../components/input/Input";
import { PasswordInput } from "../../components/passwordInput/PasswordInput";
import { Button } from "../../components/button/Button";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

export const Register = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Регистрация" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
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
        </Card>
      </Row>
    </Layout>
  );
};
