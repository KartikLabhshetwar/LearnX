import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

const PrivateRoute = ({ children }) => {
  const { admin, loading } = useContext(AdminContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!admin) {
    return <Navigate to="/admin/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;