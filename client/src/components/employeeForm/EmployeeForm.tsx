import { FC } from "react";
import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { Input } from "../input/Input";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import { Button } from "../button/Button";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};

export const EmployeeForm: FC<Props<Employee>> = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <Input type="text" name="firstName" placeholder="Имя" />
        <Input type="text" name="lastName" placeholder="Фамилия" />
        <Input type="number" name="age" placeholder="Возраст" />
        <Input type="text" name="address" placeholder="Адрес" />
        <Space>
          <ErrorMessage message={error} />
          <Button htmlType="submit" type="primary">
            {btnText}
          </Button>
        </Space>
      </Form>
    </Card>
  );
};
