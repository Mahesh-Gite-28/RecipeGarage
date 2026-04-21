import React, { useState } from "react";

const AuthModal = ({ show, setShow }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = isLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/signup";

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
        setForm({ email: "", password: "" });

        setTimeout(() => {
          setShow(false);
          setMsg("");
        }, 1000);
      } else {
        setMsg(data.message || "Error");
      }
    } catch (err) {
      setMsg("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-80 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        {msg && (
          <p className="text-center text-sm text-red-500 mb-3">
            {msg}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-700 text-white py-2 rounded"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center mt-3">
          {isLogin ? "No account?" : "Already have account?"}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMsg("");
              setForm({ email: "", password: "" });
            }}
            className="text-green-700 cursor-pointer ml-1"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

        <button
          onClick={() => {
            setShow(false);
            setMsg("");
            setForm({ email: "", password: "" });
          }}
          className="mt-3 text-red-500 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;