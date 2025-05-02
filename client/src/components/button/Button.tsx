import { Button as AntButton, Form } from "antd";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type?: "default" | "link" | "text" | "primary" | "dashed" | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: ReactNode;
  style?: React.CSSProperties;
  ghost?: boolean;
};

export const Button: FC<Props> = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  shape,
  icon,
  onClick,
  style,
  ghost,
}) => {
  return (
    <Form.Item>
      <AntButton
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
        style={style}
        ghost={ghost}
      >
        {children}
      </AntButton>
    </Form.Item>
  );
};
