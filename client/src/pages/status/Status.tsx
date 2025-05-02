import { useParams } from "react-router-dom";
import { Row, Result, Button } from "antd";
import { Link } from "react-router-dom";

const Statusses: Record<string, string> = {
  created: "Сотрудник успешно создан",
  deleted: "Сотрудник успешно удалён",
  updated: "Сотрудник успешно обновлён",
};

export const Status = () => {
  const { status } = useParams();
  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Result
        status={status ? "success" : 404}
        title={status ? Statusses[status] : "Страница не найдена"}
        extra={
          <Button variant="outlined" key="dashboard">
            <Link to="/">На главную</Link>
          </Button>
        }
      ></Result>
    </Row>
  );
};
