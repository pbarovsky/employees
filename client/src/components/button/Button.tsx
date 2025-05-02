import { Button as AntButton, Form } from "antd";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type?:
    | "default"
    | "ghost"
    | "link"
    | "text"
    | "primary"
    | "dashed"
    | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: ReactNode;
  style?: React.CSSProperties;
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
      >
        {children}
      </AntButton>
    </Form.Item>
  );
};
