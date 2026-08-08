import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      setError("");

      const response = await api.post("/auth/login", data);

      login(response.data);

      if (response.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-slate-900">
          Welcome Back
        </h1>

        <p className="text-slate-500 mt-2">
          Login to your Quiz Platform account
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-100 text-red-700 p-3">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
        >

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-slate-500 mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}