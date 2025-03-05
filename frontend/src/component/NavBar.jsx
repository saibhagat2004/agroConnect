import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Avatar from "../../public/avatars/boy1.png";

const Navbar = ({ isGuest, setIsGuest }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Logout failed");
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/login"); // Redirect after logout
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  const handleLogout = () => {
    if (isGuest) {
      setIsGuest(false);
      navigate("/login");
    } else {
      logout();
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Left: Logo */}
      <Link to="/" className="text-xl font-semibold">AgroConnect</Link>

      {/* Right: Profile Dropdown */}
      <div className="relative">
        {/* Avatar Button */}
        <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
          <img src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full border cursor-pointer" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md">
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="block px-4 py-2 text-left w-full hover:bg-gray-100">
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
