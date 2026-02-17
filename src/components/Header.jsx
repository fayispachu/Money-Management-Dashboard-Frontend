import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Power, Menu, X } from "lucide-react";
import demoUserImage from "../assets/demoUser.jpg";
function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-neutral-950 border-b border-neutral-800">
      <div className="flex flex-wrap items-center justify-between p-2 px-6 gap-4">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-6 flex-wrap">

          {/* User Box */}
          <div className="flex items-center gap-3 px-4 py-1.5 bg-neutral-900 rounded-md border border-neutral-800">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={user?.profileImage || demoUserImage}
              alt="profile"
            />
            <span className="text-white text-sm font-medium">
              {user?.name || "User"}
            </span>
          </div>

          <nav className="hidden md:flex gap-4 text-sm md:text-base text-neutral-400">
            <h1 className="hover:text-white cursor-pointer">Home</h1>
            <h1 className="hover:text-white cursor-pointer">Customers</h1>
            <h1 className="hover:text-white cursor-pointer">Settings</h1>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <input
            className="w-64 bg-neutral-900 border border-neutral-700 rounded-md px-3 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            type="search"
            placeholder="Search..."
          />

          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-neutral-800 hover:bg-red-600 transition group"
          >
            <Power size={18} className="text-neutral-400 group-hover:text-white" />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-neutral-950 border-t border-neutral-800">
          <h1 className="text-neutral-400 hover:text-white cursor-pointer">
            Home
          </h1>
          <h1 className="text-neutral-400 hover:text-white cursor-pointer">
            Customers
          </h1>
          <h1 className="text-neutral-400 hover:text-white cursor-pointer">
            Settings
          </h1>

          <input
            className="w-full bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-sm text-white"
            type="search"
            placeholder="Search..."
          />

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 p-2 rounded-md bg-neutral-800 hover:bg-red-600 transition text-white"
          >
            <Power size={18} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
