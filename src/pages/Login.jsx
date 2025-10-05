// FILE: src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return alert("⚠️ Please enter a valid username!");
    // store locally (so Chat page can read it)
    localStorage.setItem("chat_username", trimmed);
    navigate("/chat");
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center gap-4">
      <label htmlFor="username" className="w-full text-left">
        Enter your name:
      </label>
      <input
        id="username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name..."
        className="w-full p-2 rounded border border-green-700 text-black"
      />
      <button
        className="w-full bg-green-600 hover:bg-green-500 p-2 rounded text-white"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
