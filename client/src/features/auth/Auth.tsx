import { FC, PropsWithChildren } from "react";
import { useCurrentQuery } from "../../app/services/auth";
import { Spin } from "antd";

export const Auth: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    // return <span>Загрузка...</span>;
    return (
      <Spin tip="Loading" size="small">
        Загрузка...
      </Spin>
    );
  }

  return children;
};
