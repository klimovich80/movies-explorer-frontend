import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: children, ...props }) => {
    return props.isLoggedIn
        ? children
        : <Navigate to="/" replace />;
};

export default ProtectedRoute;