import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentDashboard() {

    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAttempts();
    }, []);

    const fetchAttempts = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/student/attempts",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAttempts(response.data);

        } catch (error) {

            console.error("Failed to load attempts:", error);

        } finally {

            setLoading(false);
        }
    };

    const quizzesAttempted = attempts.length;

    const averageScore =
        quizzesAttempted > 0
            ? Math.round(
                attempts.reduce(
                    (sum, attempt) =>
                        sum +
                        ((attempt.score / attempt.totalQuestions) * 100),
                    0
                ) / quizzesAttempted
            )
            : 0;

    const highestScore =
        quizzesAttempted > 0
            ? Math.max(
                ...attempts.map(
                    attempt =>
                        (attempt.score / attempt.totalQuestions) * 100
                )
            )
            : 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 p-8">
                <h2 className="text-2xl font-bold">
                    Loading dashboard...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">

            <header className="bg-white border-b px-8 py-4 flex justify-between">

                <h1 className="text-2xl font-bold text-slate-900">
                    Quiz Platform
                </h1>

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        navigate("/login");
                    }}
                    className="text-red-600 font-semibold"
                >
                    Logout
                </button>

            </header>

            <main className="p-8">

                <h2 className="text-3xl font-bold text-slate-900">
                    Welcome, Test Student 👋
                </h2>

                <p className="text-slate-500 mt-2">
                    Student Dashboard
                </p>


                {/* Statistics */}

                <div className="grid md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-slate-500">
                            Quizzes Attempted
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {quizzesAttempted}
                        </h3>

                    </div>


                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-slate-500">
                            Average Score
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {averageScore}%
                        </h3>

                    </div>


                    <div className="bg-white rounded-xl shadow p-6">

                        <p className="text-slate-500">
                            Highest Score
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {Math.round(highestScore)}%
                        </h3>

                    </div>

                </div>


                {/* Actions */}

                <div className="mt-10 flex gap-4">

                    <button
                        onClick={() =>
                            navigate("/student/quizzes")
                        }
                        className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Browse Available Quizzes →
                    </button>

                </div>


                {/* Recent Attempts */}

                {attempts.length > 0 && (

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold mb-4">
                            Recent Attempts
                        </h2>

                        <div className="bg-white rounded-xl shadow overflow-hidden">

                            {attempts.map((attempt) => {

                                const percentage = Math.round(
                                    (attempt.score /
                                        attempt.totalQuestions) *
                                    100
                                );

                                return (
                                    <div
                                        key={attempt.id}
                                        className="border-b last:border-b-0 p-5 flex justify-between items-center"
                                    >

                                        <div>

                                            <h3 className="font-bold">
                                                {attempt.quiz?.title}
                                            </h3>

                                            <p className="text-slate-500 text-sm">
                                                Score:{" "}
                                                {attempt.score}/
                                                {attempt.totalQuestions}
                                            </p>

                                        </div>

                                        <div className="font-bold">
                                            {percentage}%
                                        </div>

                                    </div>
                                );

                            })}

                        </div>

                    </div>

                )}

            </main>

        </div>
    );
}