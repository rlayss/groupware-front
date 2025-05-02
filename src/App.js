import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import AdminAddEmployeePage from "./pages/admin/AdminAddEmployee";
import AdminIndexPage from "./pages/admin/AdminIndex";
import AdminManageEmployeePage from "./pages/admin/AdminManageEmployee";
import UserIndexPage from "./pages/user/UserIndex";
import UserWorkspacePage from "./pages/user/UserWorkspace";
import { useState } from "react";
import { UserProvider } from "./provider/UserProvider";
import UserChangePasswordPage from "./pages/user/UserChangePassword";
import UserWorkspaceLayout from "./pages/user/UserLayout";
import UserBoardPage from "./pages/user/UserBoard";
import UserBoardWritePage from "./pages/user/UserBoardWrite";
import UserBoardViewPage from "./pages/user/UserBoardView";

function App() {
  const [user, setUser] = useState(null);
  console.log(user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/user/index" />,
    },
    {
      path: "/user/index",
      element: <UserIndexPage />,
    },
    {
      path: "/user/workspace",
      element: <UserWorkspaceLayout />,
      children: [
        { path: "/user/workspace", element: <UserWorkspacePage /> },
        {
          path: "/user/workspace/setting/password",
          element: <UserChangePasswordPage />,
        },
        {
          path: "/user/workspace/board",
          element: <UserBoardPage />,
        },
        {
          path: "/user/workspace/board/:id",
          element: <UserBoardViewPage />,
        },
        {
          path: "/user/workspace/board/write",
          element: <UserBoardWritePage />,
        },
      ],
    },
    {
      path: "/admin/index",
      element: <AdminIndexPage />,
    },
    {
      path: "/admin/employees/add",
      element: <AdminAddEmployeePage />,
    },
    {
      path: "/admin/employees/manage",
      element: <AdminManageEmployeePage />,
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />;
    </UserProvider>
  );
}

export default App;
