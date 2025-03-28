"use client";
import { useState } from "react";
import { Login } from "../services/auth.service";

export default function LoginTemplate() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const {isLogged, message} = await Login(identifier, password);
    if (!isLogged) {
      setError(message);
      return;
    }
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-green-500">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-gray-900 rounded-lg shadow-lg"
      >
        <h2 className="text-xl mb-4">Login</h2>

        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full p-2 bg-green-600 hover:bg-green-500 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
