// import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./Login";

const routes = [
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "/",
                element: <h1>HELLO</h1>,
            },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
];

export default routes;
