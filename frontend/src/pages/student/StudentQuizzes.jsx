import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentQuizzes() {

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/student/quizzes",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setQuizzes(response.data);

        } catch (err) {
            console.error(err);
            setError("Failed to load quizzes.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 p-8">
                <h2 className="text-2xl font-bold">
                    Loading quizzes...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">

            <header className="bg-white border-b px-8 py-4">
                <h1 className="text-2xl font-bold text-slate-900">
                    Available Quizzes
                </h1>
            </header>

            <main className="p-8">

                <button
                    onClick={() => navigate("/student/dashboard")}
                    className="mb-6 text-blue-600 font-semibold"
                >
                    ← Back to Dashboard
                </button>

                {error && (
                    <p className="text-red-600 mb-6">
                        {error}
                    </p>
                )}

                {quizzes.length === 0 ? (

                    <div className="bg-white rounded-xl shadow p-10 text-center">
                        <h2 className="text-xl font-bold">
                            No quizzes available
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Please check back later.
                        </p>
                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {quizzes.map((quiz) => (

                            <div
                                key={quiz.id}
                                className="bg-white rounded-xl shadow p-6"
                            >

                                <h2 className="text-xl font-bold text-slate-900">
                                    {quiz.title}
                                </h2>

                                <p className="text-slate-500 mt-2">
                                    {quiz.description}
                                </p>

                                {quiz.category && (
                                    <p className="text-sm text-blue-600 mt-4">
                                        Category: {quiz.category.name}
                                    </p>
                                )}

                                <button
                                    onClick={() =>
                                        navigate(`/student/quizzes/${quiz.id}`)
                                    }
                                    className="mt-6 w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700"
                                >
                                    Start Quiz
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </main>
        </div>
    );
}