"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import Image from "next/image";

const Login = () => {
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/user/authenticate", values)
        .then((response) => {
          toast.success("Login Successful");
          localStorage.setItem("user", JSON.stringify(response.data));
          router.push("/");
        })
        .catch((err) => {
          toast.error("Login Failed");
        });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900 font-sans">
      <div className="relative bg-black/70 border border-green-600 rounded-2xl shadow-2xl p-8 w-full max-w-md backdrop-blur-md">
        {/* Cyber Globe or Shield Icon */}
        <div className="flex justify-center mb-6">
          <Image src="/globe.svg" alt="Cyber Globe" width={64} height={64} />
        </div>
        <h1 className="text-center text-3xl font-extrabold text-green-400 mb-2 drop-shadow-lg">
          SecureSphere Login
        </h1>
        <p className="text-center text-green-200 mb-6 font-mono">
          Enter your credentials to access the SecureSphere dashboard.
        </p>
        <form onSubmit={loginForm.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-green-300 mb-2 font-mono"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={loginForm.handleChange}
              value={loginForm.values.email}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-700 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 font-mono"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-green-300 mb-2 font-mono"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-700 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 font-mono"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-green-500 text-black font-bold shadow-lg hover:bg-green-400 transition-colors text-lg font-mono"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-green-300 text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-green-400 hover:underline font-bold"
          >
            Sign up here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;