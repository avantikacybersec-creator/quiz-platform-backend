import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <header className="bg-white border-b px-8 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-slate-900">
          Quiz Platform
        </h1>

        <button
          onClick={handleLogout}
          className="text-red-600 font-medium hover:text-red-800"
        >
          Logout
        </button>

      </header>

      <main className="p-8">

        <h2 className="text-3xl font-bold text-slate-900">
          Welcome, {user?.name} 👋
        </h2>

        <p className="text-slate-500 mt-2">
          Student Dashboard
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-slate-500">
              Quizzes Attempted
            </p>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-slate-500">
              Average Score
            </p>

            <p className="text-3xl font-bold mt-2">
              0%
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-slate-500">
              Highest Score
            </p>

            <p className="text-3xl font-bold mt-2">
              0%
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}