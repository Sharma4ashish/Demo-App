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
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const err = {};

    if (!emailRegex.test(form.email)) {
      err.email = "Invalid email";
    }

    if (form.password.length < 6) {
      err.password = "Min 6 characters required";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    try {
      const res = await api.post("/auth/login", form);
      setUser(res.data.user);

      toast.success("Login successful 🚀");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const isValid =
    emailRegex.test(form.email) && form.password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <Card className="max-w-md mx-auto" >
        <Title>Login</Title>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            error={errors.password}
          />

          <Button disabled={!isValid}>Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;