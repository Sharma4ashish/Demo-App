import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import api from "../services/Api";

import Input from "./ui/Input";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Title from "./ui/Title";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      return toast.error("Invalid email");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      const res = await api.post("/user/login", {
        email,
        password,
      });
      console.log("Loginnnnnnn " ,res.data.token);
      

      localStorage.setItem("token", res.data.token);
      console.log(       localStorage.getItem("token"));


      setUser(res.data.user);

      toast.success("Login successful 🚀");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const isFilled = email.length > 0 || password.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <Card className="max-w-md mx-auto">
        <Title>Login</Title>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button disabled={!isFilled}>Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;