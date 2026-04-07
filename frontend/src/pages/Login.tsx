import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post("http://127.0.0.1:8000/login", {
      username,
      password,
    });
console.log(res.data); 
    localStorage.setItem("user_id", res.data.user_id);
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 shadow-lg rounded-xl">
        <h1 className="text-2xl mb-4">Login</h1>
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}