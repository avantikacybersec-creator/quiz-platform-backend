import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Categories from "./Categories";
import Quizzes from "./Quizzes";


export default function AdminDashboard() {

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
                    Quiz Platform Admin
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
                    Admin Dashboard
                </p>

                <div className="mt-8 grid md:grid-cols-4 gap-6">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-slate-500">
                            Students
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            0
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-slate-500">
                            Quizzes
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            0
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-slate-500">
                            Questions
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            0
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <p className="text-slate-500">
                            Attempts
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            0
                        </p>
                    </div>

                </div>

                {/* Categories */}
                <div className="mt-10">
                    <Categories />
                </div>
                {/* Quiz Management */}
                <div className="mt-10 bg-white rounded-2xl shadow p-6">

                    <div className="flex justify-between items-center mb-6">

                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Quiz Management
                            </h3>

                            <p className="text-sm text-slate-500 mt-1">
                                Create and manage quizzes for students
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/admin/quizzes")}
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            + Create Quiz
                        </button>

                    </div>

                    <div className="border border-dashed border-slate-300 rounded-xl p-10 text-center">

                        <div className="text-4xl mb-3">
                            📝
                        </div>

                        <h4 className="text-lg font-semibold text-slate-800">
                            No quizzes yet
                        </h4>

                        <p className="text-slate-500 mt-1">
                            Create your first quiz to get started.
                        </p>

                        <button
                            onClick={() => navigate("/admin/quizzes")}
                            className="mt-5 text-blue-600 font-semibold hover:text-blue-800"
                        >
                            Manage Quizzes →
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}