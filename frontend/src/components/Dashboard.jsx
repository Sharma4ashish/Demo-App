import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import api from "../services/Api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response:", res.data.data);

      setUser(res.data.data); 
    } catch (err) {
      navigate("/");
    }
  };

  fetchUser();
}, []);



  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const leads = [
    { id: 1, name: "Rahul Sharma", status: "New" },
    { id: 2, name: "Priya Verma", status: "Contacted" },
  ];

  const tasks = [
    { id: 1, title: "Follow up", priority: "High" },
    { id: 2, title: "Prepare demo", priority: "Medium" },
  ];

  const users = [
    { id: 1, name: "Admin", role: "Manager" },
    { id: 2, name: "John", role: "Sales" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Welcome, {user?.name || "User"}
        </h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card><p>Leads: {leads.length}</p></Card>
        <Card><p>Tasks: {tasks.length}</p></Card>
        <Card><p>Users: {users.length}</p></Card>
      </div>

      {/* Data */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <h3>Leads</h3>
          {leads.map((l) => <p key={l.id}>{l.name}</p>)}
        </Card>

        <Card>
          <h3>Tasks</h3>
          {tasks.map((t) => <p key={t.id}>{t.title}</p>)}
        </Card>

        <Card>
          <h3>Users</h3>
          {users.map((u) => <p key={u.id}>{u.name}</p>)}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;