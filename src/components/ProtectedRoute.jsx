import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({children}) => {
    const { currentUser } = useAuth();

    if(!currentUser) {
        return<Navigate to="/login" replace />
    }

    return children;
}

export default ProtectedRoute;
