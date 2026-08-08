import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../../api/axios";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setError("");
      setSuccess("");

      await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-slate-900">
          Create Account
        </h1>

        <p className="text-slate-500 mt-2">
          Join the Quiz Platform
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-100 text-red-700 p-3">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-lg bg-green-100 text-green-700 p-3">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
        >

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}