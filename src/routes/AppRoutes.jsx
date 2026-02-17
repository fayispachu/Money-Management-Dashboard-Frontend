import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthProvider } from "../context/AuthContext";
import { WalletProvider } from "../context/WalletContext";
import { BankProvider } from "../context/BankContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const AppRoutes = () => {
  return (
    <BrowserRouter>
  <AuthProvider>
    <BankProvider>
      <WalletProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#171717", // neutral-900
              color: "#fff",
              border: "1px solid #262626", // neutral-800
            },
            success: {
              iconTheme: {
                primary: "#10b981", // emerald-500
                secondary: "#171717",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#171717",
              },
            },
          }}
        />

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
