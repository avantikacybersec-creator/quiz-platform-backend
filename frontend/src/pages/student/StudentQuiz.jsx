import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function StudentQuiz() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchQuiz();
    }, [id]);

    const fetchQuiz = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const quizResponse = await axios.get(
                `http://localhost:8080/api/student/quizzes/${id}`,
                { headers }
            );

            const questionsResponse = await axios.get(
                `http://localhost:8080/api/student/quizzes/${id}/questions`,
                { headers }
            );

            console.log("QUIZ:", quizResponse.data);
            console.log("QUESTIONS:", questionsResponse.data);

            setQuiz(quizResponse.data);
            setQuestions(questionsResponse.data);

        } catch (err) {
            console.error("FETCH QUIZ ERROR:", err);

            if (err.response) {
                console.error("STATUS:", err.response.status);
                console.error("DATA:", err.response.data);
            }

            setError("Failed to load quiz.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionId, answer) => {
        setAnswers((previousAnswers) => ({
            ...previousAnswers,
            [questionId]: answer
        }));
    };

    const handleSubmit = async () => {
        if (questions.length === 0) {
            setError("There are no questions in this quiz.");
            return;
        }

        if (Object.keys(answers).length !== questions.length) {
            setError("Please answer all questions before submitting.");
            return;
        }

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
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("SUBMIT RESPONSE:", response.data);

            navigate(
                `/student/attempts/${response.data.attemptId}`
            );

        } catch (err) {
            console.error("SUBMIT QUIZ ERROR:", err);

            if (err.response) {
                console.error("STATUS:", err.response.status);
                console.error("DATA:", err.response.data);
            }

            setError("Failed to submit quiz.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow p-8">
                    <h2 className="text-xl font-bold">
                        Loading quiz...
                    </h2>
                </div>
            </div>
        );
    }

    if (error && !quiz) {
        return (
            <div className="min-h-screen bg-slate-100 p-8">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
                    <h2 className="text-xl font-bold text-red-600">
                        Error
                    </h2>

                    <p className="mt-3 text-slate-600">
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/student/quizzes")}
                        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        Back to Quizzes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">

            <header className="bg-white border-b px-8 py-5">
                <div className="max-w-4xl mx-auto">

                    <h1 className="text-2xl font-bold text-slate-900">
                        {quiz?.title}
                    </h1>

                    <p className="text-slate-500 mt-1">
                        {quiz?.description}
                    </p>

                    <p className="text-sm text-slate-400 mt-2">
                        {questions.length} questions
                    </p>

                </div>
            </header>

            <main className="max-w-4xl mx-auto p-8">

                <button
                    onClick={() => navigate("/student/quizzes")}
                    className="mb-6 text-blue-600 font-semibold hover:underline"
                >
                    ← Back to Quizzes
                </button>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
                        {error}
                    </div>
                )}

                {questions.length === 0 ? (

                    <div className="bg-white rounded-xl shadow p-10 text-center">

                        <h2 className="text-xl font-bold">
                            No questions available
                        </h2>

                        <p className="text-slate-500 mt-2">
                            This quiz does not contain any questions yet.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {questions.map((question, index) => (

                            <div
                                key={question.id}
                                className="bg-white rounded-xl shadow p-6"
                            >

                                <h2 className="text-lg font-bold text-slate-900">
                                    {index + 1}. {question.questionText}
                                </h2>

                                <div className="mt-5 space-y-3">

                                    <label
                                        className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer ${
                                            answers[question.id] === "A"
                                                ? "border-blue-500 bg-blue-50"
                                                : "hover:bg-slate-50"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value="A"
                                            checked={
                                                answers[question.id] === "A"
                                            }
                                            onChange={() =>
                                                handleAnswerChange(
                                                    question.id,
                                                    "A"
                                                )
                                            }
                                        />

                                        <span className="font-semibold">
                                            A.
                                        </span>

                                        <span>
                                            {question.optionA}
                                        </span>
                                    </label>

                                    <label
                                        className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer ${
                                            answers[question.id] === "B"
                                                ? "border-blue-500 bg-blue-50"
                                                : "hover:bg-slate-50"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value="B"
                                            checked={
                                                answers[question.id] === "B"
                                            }
                                            onChange={() =>
                                                handleAnswerChange(
                                                    question.id,
                                                    "B"
                                                )
                                            }
                                        />

                                        <span className="font-semibold">
                                            B.
                                        </span>

                                        <span>
                                            {question.optionB}
                                        </span>
                                    </label>

                                    <label
                                        className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer ${
                                            answers[question.id] === "C"
                                                ? "border-blue-500 bg-blue-50"
                                                : "hover:bg-slate-50"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value="C"
                                            checked={
                                                answers[question.id] === "C"
                                            }
                                            onChange={() =>
                                                handleAnswerChange(
                                                    question.id,
                                                    "C"
                                                )
                                            }
                                        />

                                        <span className="font-semibold">
                                            C.
                                        </span>

                                        <span>
                                            {question.optionC}
                                        </span>
                                    </label>

                                    <label
                                        className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer ${
                                            answers[question.id] === "D"
                                                ? "border-blue-500 bg-blue-50"
                                                : "hover:bg-slate-50"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value="D"
                                            checked={
                                                answers[question.id] === "D"
                                            }
                                            onChange={() =>
                                                handleAnswerChange(
                                                    question.id,
                                                    "D"
                                                )
                                            }
                                        />

                                        <span className="font-semibold">
                                            D.
                                        </span>

                                        <span>
                                            {question.optionD}
                                        </span>
                                    </label>

                                </div>

                            </div>

                        ))}

                        <div className="bg-white rounded-xl shadow p-6">

                            <div className="flex justify-between items-center mb-4">

                                <span className="font-semibold text-slate-700">
                                    Progress
                                </span>

                                <span className="text-blue-600 font-bold">
                                    {Object.keys(answers).length} /{" "}
                                    {questions.length}
                                </span>

                            </div>

                            <div className="w-full bg-slate-200 rounded-full h-3">

                                <div
                                    className="bg-blue-600 h-3 rounded-full transition-all"
                                    style={{
                                        width: `${
                                            (Object.keys(answers).length /
                                                questions.length) *
                                            100
                                        }%`
                                    }}
                                />

                            </div>

                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className={`w-full py-3 rounded-lg font-semibold text-white ${
                                submitting
                                    ? "bg-slate-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {submitting
                                ? "Submitting..."
                                : "Submit Quiz"}
                        </button>

                    </div>

                )}

            </main>
        </div>
    );
}