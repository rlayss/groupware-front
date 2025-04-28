import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminAddEmployeePage from "./pages/admin/AdminAddEmployee";
import AmdinIndexPage from "./pages/admin/AdminIndex";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin/index",
      element: <AmdinIndexPage />,
    },
    {
      path: "/admin/employee",
      element: <AdminAddEmployeePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
