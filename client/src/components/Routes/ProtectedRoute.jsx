import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../../provider/authProvider";

export const ProtectedRoute = (props) => {
  const { token,role } = useAuth();
  
  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }
  if(role!=props.role){
    return <Navigate to="/landing" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
