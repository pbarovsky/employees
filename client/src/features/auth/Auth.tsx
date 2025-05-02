import { FC, PropsWithChildren } from "react";
import { useCurrentQuery } from "../../app/services/auth";
import { Spin } from "../../components/spin/Spin";

export const Auth: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Spin />;
  }

  return children;
};
