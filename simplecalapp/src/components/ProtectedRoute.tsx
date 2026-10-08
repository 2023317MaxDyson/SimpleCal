import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;