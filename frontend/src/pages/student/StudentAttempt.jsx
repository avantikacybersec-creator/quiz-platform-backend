import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function StudentAttempt() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [attempt, setAttempt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAttempt();
    }, [id]);

    const fetchAttempt = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:8080/api/student/attempts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAttempt(response.data);

        } catch (err) {

            console.error(err);
            setError("Failed to load result.");

        } finally {

            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <h2 className="text-2xl font-bold">
                    Loading result...
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow p-8 text-center">
                    <p className="text-red-600 font-semibold">
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/student/quizzes")}
                        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Back to Quizzes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">

            <header className="bg-white border-b px-8 py-4">
                <h1 className="text-2xl font-bold text-slate-900">
                    Quiz Result
                </h1>
            </header>

            <main className="max-w-3xl mx-auto p-8">

                <div className="bg-white rounded-2xl shadow p-8">

                    <div className="text-center">

                        <h2 className="text-3xl font-bold text-slate-900">
                            {attempt.quiz?.title}
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Your quiz has been submitted successfully.
                        </p>

                    </div>

                    <div className="mt-8 grid md:grid-cols-3 gap-4">

                        <div className="bg-slate-50 rounded-xl p-5 text-center">
                            <p className="text-sm text-slate-500">
                                Score
                            </p>

                            <p className="text-3xl font-bold text-blue-600 mt-2">
                                {attempt.score}
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-5 text-center">
                            <p className="text-sm text-slate-500">
                                Total Questions
                            </p>

                            <p className="text-3xl font-bold text-slate-900 mt-2">
                                {attempt.totalQuestions}
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-5 text-center">
                            <p className="text-sm text-slate-500">
                                Percentage
                            </p>

                            <p className="text-3xl font-bold text-green-600 mt-2">
                                {attempt.totalQuestions > 0
                                    ? Math.round(
                                        (attempt.score /
                                            attempt.totalQuestions) * 100
                                    )
                                    : 0
                                }%
                            </p>
                        </div>

                    </div>

                    <div className="mt-8 border-t pt-6">

                        <p className="text-slate-600">
                            <span className="font-semibold">
                                Attempt ID:
                            </span>{" "}
                            {attempt.id}
                        </p>

                        <p className="text-slate-600 mt-2">
                            <span className="font-semibold">
                                Started:
                            </span>{" "}
                            {attempt.startedAt
                                ? new Date(
                                    attempt.startedAt
                                ).toLocaleString()
                                : "N/A"
                            }
                        </p>

                        <p className="text-slate-600 mt-2">
                            <span className="font-semibold">
                                Completed:
                            </span>{" "}
                            {attempt.completedAt
                                ? new Date(
                                    attempt.completedAt
                                ).toLocaleString()
                                : "N/A"
                            }
                        </p>

                    </div>

                    <div className="mt-8 flex gap-4">

                        <button
                            onClick={() =>
                                navigate("/student/quizzes")
                            }
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            Take Another Quiz
                        </button>

                        <button
                            onClick={() =>
                                navigate("/student/dashboard")
                            }
                            className="flex-1 border border-slate-300 py-3 rounded-lg font-semibold hover:bg-slate-50"
                        >
                            Dashboard
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}