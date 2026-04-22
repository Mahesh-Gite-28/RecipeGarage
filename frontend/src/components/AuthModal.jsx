import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const AuthModal = ({ show, setShow, initialMode = "login" }) => {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode, show]);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validation
    if (!isLogin && form.username.trim().length < 3) {
      setMsg("Username must be at least 3 characters");
      setIsError(true);
      return;
    }

    if (form.password.length < 6) {
      setMsg("Password must be at least 6 characters");
      setIsError(true);
      return;
    }

    const url = isLogin
      ? `${API_BASE}/login`
      : `${API_BASE}/signup`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setMsg(data.message);
        setIsError(false);

        if (isLogin) {
          login(data.user);
        }

        setForm({ username: "", email: "", password: "" });

        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        setMsg(data.message || "Error");
        setIsError(true);
      }
    } catch (err) {
      setMsg("Something went wrong");
      setIsError(true);
      console.log(err);
    }
  };

  const handleClose = () => {
    setShow(false);
    setMsg("");
    setForm({ username: "", email: "", password: "" });
    setIsLogin(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-lg relative">

        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-6 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        {/* Decorative Header */}
        <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl">
          🍽️
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-1">Username</p>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base focus:outline-green-600"
            />
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base focus:outline-green-600"
          />
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600 mb-1">Password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base focus:outline-green-600"
          />
        </div>

        {msg && (
          <p
            className={`text-center text-sm mb-4 ${
              isError ? "text-red-500" : "text-green-600 font-semibold"
            }`}
          >
            {msg}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-700 text-white py-3 rounded-lg text-base font-bold hover:bg-green-800 transition shadow-md"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center mt-6">
          {isLogin ? "No account?" : "Already have account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMsg("");
              setForm({ username: "", email: "", password: "" });
            }}
            className="text-green-700 cursor-pointer ml-1 font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;