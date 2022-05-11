import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./Login";
import Dashboard from "./Pages/Dashboard";

const routes = [
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
];

export default routes;
