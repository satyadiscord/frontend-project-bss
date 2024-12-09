import { Navigate, useLocation } from "react-router-dom";

// Komponen ProtectedRoute untuk mengecek status login
const ProtectedRoute = ({ children, redirectPath = "/home" }) => {
  const isAuthenticated = localStorage.getItem("token"); // Ambil status token
  const location = useLocation();

  // Jika sudah login dan mencoba mengakses /login, arahkan ke halaman home
  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to={redirectPath} replace />;
  }

  // Jika belum login dan mencoba mengakses halaman terproteksi, arahkan ke halaman login
  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  // Tampilkan halaman yang diinginkan
  return children;
};

export default ProtectedRoute;
