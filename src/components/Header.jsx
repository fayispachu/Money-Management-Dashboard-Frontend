import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Power } from "lucide-react";

function Header() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-neutral-950 border-b border-neutral-800">
      <div className="flex flex-wrap items-center justify-between p-2 px-6 gap-4">

        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-3 px-4 py-1 bg-neutral-900 rounded-md">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="/assets/demoUser.jpg"
              alt="profile"
            />
          </div>

          <nav className="flex gap-4 text-sm md:text-base text-neutral-400">
            <h1 className="hover:text-white cursor-pointer">Home</h1>
            <h1 className="hover:text-white cursor-pointer">Customers</h1>
            <h1 className="hover:text-white cursor-pointer">Settings</h1>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <input
            className="w-64 bg-neutral-900 border border-neutral-700 rounded-md px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            type="search"
            placeholder="Search..."
          />

          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-neutral-800 hover:bg-red-600 transition group"
            title="Logout"
          >
            <Power
              size={18}
              className="text-neutral-400 group-hover:text-white transition"
            />
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;
