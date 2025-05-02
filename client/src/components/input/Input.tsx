import { Input as AntdInput, Form } from "antd";
import { FC } from "react";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
};

export const Input: FC<Props> = ({ name, placeholder, type = "text" }) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[{ required: true, message: "Обязательное поле!" }]}
    >
      <AntdInput placeholder={placeholder} type={type} size="large"></AntdInput>
    </Form.Item>
  );
};
