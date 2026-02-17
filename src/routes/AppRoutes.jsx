import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthProvider } from "../context/AuthContext";
import { WalletProvider } from "../context/WalletContext";
import { BankProvider } from "../context/BankContext";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BankProvider>
          <WalletProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </WalletProvider>
        </BankProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
