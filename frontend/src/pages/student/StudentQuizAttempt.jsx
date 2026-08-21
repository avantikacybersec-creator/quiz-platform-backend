import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function StudentQuizAttempt() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);

    useEffect(() => {
        fetchQuiz();
    }, [id]);

    const fetchQuiz = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:8080/api/student/quizzes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setQuiz(response.data);

        } catch (err) {

            console.error(err);
            setError("Failed to load quiz.");

        } finally {

            setLoading(false);
        }
    };

    const handleAnswerChange = (questionId, answer) => {

        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleSubmit = async () => {

        try {

            setSubmitting(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8080/api/student/attempts",
                {
                    quizId: Number(id),
                    answers: answers
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setResult(response.data);

        } catch (err) {

            console.error(err);
            setError("Failed to submit quiz.");

        } finally {

            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 p-8">
                <h2 className="text-2xl font-bold">
                    Loading quiz...
                </h2>
            </div>
        );
    }

    if (error && !quiz) {
        return (
            <div className="min-h-screen bg-slate-100 p-8">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (result) {
        return (
            <div className="min-h-screen bg-slate-100 p-8">

                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 text-center">

                    <h1 className="text-3xl font-bold text-slate-900">
                        Quiz Completed 🎉
                    </h1>

                    <p className="text-slate-500 mt-3">
                        {result.quizTitle}
                    </p>

                    <div className="mt-8">

                        <p className="text-lg">
                            Score
                        </p>

                        <p className="text-5xl font-bold text-blue-600 mt-2">
                            {result.score}/{result.totalQuestions}
                        </p>

                        <p className="text-2xl font-semibold mt-4">
                            {result.percentage}%
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/student/dashboard")}
                        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Back to Dashboard
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">

            <header className="bg-white border-b px-8 py-4">
                <h1 className="text-2xl font-bold text-slate-900">
                    {quiz?.title}
                </h1>

                <p className="text-slate-500 mt-1">
                    {quiz?.description}
                </p>
            </header>

            <main className="max-w-4xl mx-auto p-8">

                <button
                    onClick={() => navigate("/student/quizzes")}
                    className="mb-6 text-blue-600 font-semibold"
                >
                    ← Back to Quizzes
                </button>

                {error && (
                    <p className="text-red-600 mb-6">
                        {error}
                    </p>
                )}

                <div className="space-y-6">

                    {quiz?.questions?.map((question, index) => (

                        <div
                            key={question.id}
                            className="bg-white rounded-xl shadow p-6"
                        >

                            <h2 className="text-lg font-bold text-slate-900">
                                {index + 1}. {question.questionText}
                            </h2>

                            <div className="mt-4 space-y-3">

                                {["A", "B", "C", "D"].map(option => (

                                    <label
                                        key={option}
                                        className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50"
                                    >

                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option}
                                            checked={
                                                answers[question.id] === option
                                            }
                                            onChange={() =>
                                                handleAnswerChange(
                                                    question.id,
                                                    option
                                                )
                                            }
                                        />

                                        <span>
                                            {option}
                                        </span>

                                    </label>

                                ))}

                            </div>

                        </div>

                    ))}

                </div>

                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                    {submitting ? "Submitting..." : "Submit Quiz"}
                </button>

            </main>

        </div>
    );
}