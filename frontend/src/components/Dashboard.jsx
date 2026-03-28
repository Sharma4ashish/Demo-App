import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";

const Dashboard = () => {
  const { user, setUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-800 p-6 text-white">
      <div className="flex justify-between">
        <h1>Welcome, {user?.name}</h1>

        <div className="w-32">
          <Button onClick={() => setUser(null)}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;