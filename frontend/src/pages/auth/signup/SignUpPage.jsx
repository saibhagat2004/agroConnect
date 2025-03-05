import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "customer", // Default role
  });

  const signupMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      if (!res.ok) throw new Error(response.error || "Signup failed");
      return response;
    },
    onSuccess: () => {
      toast.success("Account created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="mb-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <select
              name="role"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            {signupMutation.isPending ? "Signing up..." : "Sign Up"}
          </button>

          {/* Login Redirect */}
          <p className="mt-4 text-center">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
