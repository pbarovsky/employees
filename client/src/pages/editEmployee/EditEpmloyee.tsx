import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employyes";
import { Spin } from "../../components/spin/Spin";
import { Layout } from "../../components/layout/Layout";
import { Row } from "antd";
import { EmployeeForm } from "../../components/employeeForm/EmployeeForm";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const EditEpmloyee = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetEmployeeQuery(id || "");
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <Spin />;
  }

  const editUserHandle = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };

      await editEmployee(editedEmployee).unwrap();
      navigate(`${Paths.status}/updated`);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Редактрировать сотрудника"
          btnText="Редактировать"
          error={error}
          employee={data}
          onFinish={editUserHandle}
        ></EmployeeForm>
      </Row>
    </Layout>
  );
};
