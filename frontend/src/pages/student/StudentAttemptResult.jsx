import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function StudentAttemptResult() {

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

            console.log("ATTEMPT RESULT:", response.data);

            setAttempt(response.data);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load quiz result."
            );

        } finally {

            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 p-8">
                <h2 className="text-2xl font-bold">
                    Loading result...
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-100 p-8">

                <p className="text-red-600 mb-6">
                    {error}
                </p>

                <button
                    onClick={() => navigate("/student/quizzes")}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                    Back to Quizzes
                </button>

            </div>
        );
    }

    if (!attempt) {
        return null;
    }

    const percentage =
        attempt.totalQuestions > 0
            ? Math.round(
                (attempt.score / attempt.totalQuestions) * 100
            )
            : 0;

    return (
        <div className="min-h-screen bg-slate-100">

            <header className="bg-white border-b px-8 py-4">

                <h1 className="text-2xl font-bold text-slate-900">
                    Quiz Result
                </h1>

            </header>

            <main className="max-w-2xl mx-auto p-8">

                <div className="bg-white rounded-xl shadow p-8">

                    <h2 className="text-2xl font-bold text-slate-900">
                        {attempt.quiz?.title}
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Your quiz has been submitted successfully.
                    </p>

                    <div className="mt-8 text-center">

                        <p className="text-slate-500">
                            Your Score
                        </p>

                        <p className="text-5xl font-bold text-blue-600 mt-2">
                            {attempt.score} / {attempt.totalQuestions}
                        </p>

                        <p className="text-xl font-semibold mt-3">
                            {percentage}%
                        </p>

                    </div>

                    <div className="mt-8 border-t pt-6 space-y-3">

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Correct Answers
                            </span>

                            <span className="font-semibold">
                                {attempt.score}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Total Questions
                            </span>

                            <span className="font-semibold">
                                {attempt.totalQuestions}
                            </span>
                        </div>

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