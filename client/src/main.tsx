import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Paths } from "./paths.ts";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { ConfigProvider, theme } from "antd";
import { Auth } from "./features/auth/Auth.tsx";
import { Employees } from "./pages/employees/Employees.tsx";
import { Status } from "./pages/status/Status.tsx";
import { AddEmployee } from "./pages/addEmployee/AddEmployee.tsx";
import { Employee } from "./pages/employee/Employee.tsx";
import { EditEpmloyee } from "./pages/editEmployee/EditEpmloyee.tsx";
import "./index.css";
import "@ant-design/v5-patch-for-react-19";

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EditEpmloyee />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
