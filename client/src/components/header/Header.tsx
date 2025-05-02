import { Layout, Space, Typography } from "antd";
import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";
import sc from "./Header.module.css";

export const Header = () => {
  const { Header } = Layout;
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispath = useDispatch();

  const onLogoutHandler = () => {
    dispath(logout());
    localStorage.removeItem("token");
    navigate(Paths.login);
  };

  return (
    <Header className={sc.header}>
      <Space align="center" direction="horizontal">
        <TeamOutlined className={sc.teamIcon} />
        <Link to={Paths.home}>
          <Button type="ghost">
            <Typography.Title style={{ marginTop: "50px" }} level={1}>
              Сотрудники
            </Typography.Title>
          </Button>
        </Link>
      </Space>
      {user ? (
        <Button
          style={{ marginTop: "20px" }}
          type="ghost"
          icon={<LoginOutlined />}
          onClick={onLogoutHandler}
        >
          Выход
        </Button>
      ) : (
        <Space
          style={{ marginTop: "20px" }}
          align="center"
          direction="horizontal"
          size="large"
        >
          <Link to={Paths.register}>
            <Button icon={<UserOutlined />} type="ghost">
              Зарегистрироваться
            </Button>
          </Link>
          <Link to={Paths.login}>
            <Button icon={<LoginOutlined />} type="ghost">
              Войти
            </Button>
          </Link>
        </Space>
      )}
    </Header>
  );
};
