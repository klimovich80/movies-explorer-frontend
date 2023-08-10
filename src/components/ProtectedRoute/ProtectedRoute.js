import { Navigate } from "react-router-dom";
import { ENDPOINT_MAIN } from "../../vendor/constants/endpoints";

const ProtectedRoute = ({ element: children, ...props }) => {
    return props.isLoggedIn
        ? children
        : <Navigate to={ENDPOINT_MAIN} replace />;
};

export default ProtectedRoute;