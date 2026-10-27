import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

// The dashboard cannot be opened without logging in
export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}
