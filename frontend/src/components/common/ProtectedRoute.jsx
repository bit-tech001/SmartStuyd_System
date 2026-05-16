import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;