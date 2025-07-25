"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short..!").max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(7, "Password is too short").required("Required"),
  confirmPassword: Yup.string().required("Required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    onSubmit: async (values, { resetForm }) => {
      // Only send name, email, password to backend
      const { name, email, password } = values;
      try {
        await axios.post("http://localhost:5000/user/add", { name, email, password });
        toast.success("Successfully signup");
        // Automatically log in after signup
        const loginRes = await axios.post("http://localhost:5000/user/authenticate", { email, password });
        localStorage.setItem("token", loginRes.data.token);
        localStorage.setItem("user", JSON.stringify(loginRes.data.user));
        router.push("/dashboard");
        resetForm();
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong !!");
      }
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900 font-sans">
      <div className="relative bg-black/70 border border-green-600 rounded-2xl shadow-2xl p-8 w-full max-w-md backdrop-blur-md">
        <div className="flex justify-center mb-6">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="#00ff99" strokeWidth="4" />
            <path d="M32 16L40 32H24L32 16Z" fill="#00ff99" />
          </svg>
        </div>
        <h1 className="text-center text-3xl font-extrabold text-green-400 mb-2 drop-shadow-lg">
          SecureSphere Signup
        </h1>
        <p className="text-center text-green-200 mb-6 font-mono">
          Create your account to join SecureSphere Cybersecurity.
        </p>
        <form onSubmit={signupForm.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-green-300 mb-2 font-mono">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.name}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-700 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 font-mono"
              required
            />
            {signupForm.touched.name && signupForm.errors.name && (
              <p className="text-xs text-red-400 mt-1">{signupForm.errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-green-300 mb-2 font-mono">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.email}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-700 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 font-mono"
              required
            />
            {signupForm.touched.email && signupForm.errors.email && (
              <p className="text-xs text-red-400 mt-1">{signupForm.errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-green-300 mb-2 font-mono">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.password}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-700 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 font-mono"
              required
            />
            {signupForm.touched.password && signupForm.errors.password && (
              <p className="text-xs text-red-400 mt-1">{signupForm.errors.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-green-300 mb-2 font-mono">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              value={signupForm.values.confirmPassword}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-green-700 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 font-mono"
              required
            />
            {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
              <p className="text-xs text-red-400 mt-1">{signupForm.errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-green-500 text-black font-bold shadow-lg hover:bg-green-400 transition-colors text-lg font-mono"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-green-300 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-400 hover:underline font-bold"
          >
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;