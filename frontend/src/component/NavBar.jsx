import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Avatar from "../../public/avatars/boy1.png";

const Navbar = ({ isGuest, setIsGuest }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Left: Logo */}
      <Link to="/" className="text-xl font-semibold">Fit Kit Guide</Link>

      {/* Right: Profile Dropdown */}
      <div className="relative group">
        {/* Avatar Button */}
        <button className="flex items-center space-x-2 focus:outline-none">
          <img src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full border cursor-pointer" />
        </button>

        {/* Dropdown Menu */}
        <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
          <li>
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="block px-4 py-2 text-left w-full hover:bg-gray-100">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
