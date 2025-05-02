import { FC } from "react";
import { Form, Input as AntdInput, message } from "antd";
import { NamePath } from "antd/es/form/interface";

type Props = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
};

export const PasswordInput: FC<Props> = ({
  name,
  placeholder,
  dependencies,
}) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        { required: true, message: "Обязательное поле!" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) return Promise.resolve();

            if (name === "confirmPassword") {
              return value === getFieldValue("password")
                ? Promise.resolve()
                : Promise.reject(new Error("Пароли не совпадают"));
            }

            return value.length >= 6
              ? Promise.resolve()
              : Promise.reject(
                  new Error("Пароль должен быть длиной не менее 6-ти символов")
                );
          },
        }),
      ]}
    >
      <AntdInput.Password
        placeholder={placeholder}
        size="large"
      ></AntdInput.Password>
    </Form.Item>
  );
};
