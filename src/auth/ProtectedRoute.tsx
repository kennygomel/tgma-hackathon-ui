import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

// export default function ProtectedRoute({ role }: { role?: string }) {
export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return null; // спиннер по вкусу

  if (!user) return <Navigate to="/" replace />;

  // if (role && !user.roles.includes(role)) return <Navigate to="/403" replace />;

  return <Outlet/>;
}
