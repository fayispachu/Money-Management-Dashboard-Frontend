import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password, navigate);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="bg-neutral-900 p-8 rounded-xl shadow-lg w-full max-w-md text-white">
                        <h1 className="text-2xl font-bold mb-6 text-center text-emerald-500">Wellcome to Trust Wallet </h1>

        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-neutral-700 p-2 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-neutral-950 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-neutral-700 p-2 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-neutral-950 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 text-black py-2 px-4 rounded hover:bg-emerald-600 disabled:bg-neutral-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Add Register link */}
        <p className="text-center mt-4 text-sm text-neutral-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
