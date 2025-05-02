import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/services/employyes";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Descriptions, Divider, Space, Modal } from "antd";
import { Layout } from "../../components/layout/Layout";
import { Spin } from "../../components/spin/Spin";
import { Button } from "../../components/button/Button";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ErrorMessage } from "../../components/errorMessage/ErrorMessage";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <Spin />;
  }
  if (!data) {
    return <Navigate to="/" />;
  }

  const showModalHandler = () => {
    setIsModalOpen(true);
  };

  const hideModalHandler = () => {
    setIsModalOpen(false);
  };

  const deleteUserHandler = async () => {
    hideModalHandler();

    try {
      await removeEmployee(data.id).unwrap();
      navigate(`${Paths.status}/deleted`);
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
      <Descriptions title="Данные сотрудника" bordered column={3}>
        <Descriptions.Item label="Имя" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Возраст" span={3}>
          {`${data.age}`}
        </Descriptions.Item>
        <Descriptions.Item label="Адрес" span={3}>
          {`${data.address}`}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <Button shape="round" type="default" icon={<EditOutlined />}>
                Редактировать
              </Button>
            </Link>
            <Button
              shape="round"
              type="default"
              danger
              onClick={showModalHandler}
              icon={<DeleteOutlined />}
            >
              Удалить
            </Button>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Подтверждение удаления"
        open={isModalOpen}
        onOk={deleteUserHandler}
        onCancel={hideModalHandler}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить сотрудника?
      </Modal>
    </Layout>
  );
};
