import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/button/Button";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Employee } from "@prisma/client";
import type { ColumnsType } from "antd/es/table";
import { useGetAllEmployeesQuery } from "../../app/services/employyes";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
];

export const Employees = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <Layout>
      <Button type="primary" onClick={() => null} icon={<PlusCircleOutlined />}>
        Добавить
      </Button>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      ></Table>
    </Layout>
  );
};
