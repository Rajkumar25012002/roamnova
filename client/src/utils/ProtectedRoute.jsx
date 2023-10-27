import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../features/userSlice";
const ProtectedRoute = ({ children }) => {
  const user = useSelector(getCurrentUser);
  if (user === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
