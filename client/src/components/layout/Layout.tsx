import { FC } from "react";
import sc from "./Layout.module.css";
import { Layout as AntLayout } from "antd";
import { Header } from "../header/Header";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={sc.container}>
      <Header />
      <AntLayout.Content style={{ height: "100%" }}>
        {children}
      </AntLayout.Content>
    </div>
  );
};
