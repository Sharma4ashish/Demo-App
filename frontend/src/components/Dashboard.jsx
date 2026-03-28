import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const dummyData = ["Leads", "Tasks", "Users"];

  return (
    <div className="p-6">
      <h1 className="text-2xl">Welcome, {user?.name}</h1>

      <ul className="mt-4">
        {dummyData.map((item, index) => (
          <li key={index} className="p-2 border mb-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
