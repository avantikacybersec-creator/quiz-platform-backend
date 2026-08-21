import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function QuizAttempt() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchQuiz();
    }, [id]);

    const fetchQuiz = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/quizzes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setQuiz(response.data);

        } catch (err) {

            console.error(err);
            setError("Unable to load quiz.");

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

        if (!quiz?.questions?.length) {
            return;
        }

        setSubmitting(true);

        try {

            const response = await axios.post(
                "http://localhost:8080/api/student/attempts",
                {
                    quizId: Number(id),
                    answers
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate(`/student/results/${response.data.attemptId}`);

        } catch (err) {

            console.error(err);
            setError(
                err.response?.data?.message ||
                "Unable to submit quiz."
            );

        } finally {

            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading quiz...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                {error}
            </div>
        );
    }

    if (!quiz) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-slate-900">
                    {quiz.title}
                </h1>

                <p className="text-slate-500 mt-2">
                    {quiz.description}
                </p>

                <div className="mt-8 space-y-6">

                    {quiz.questions?.map((question, index) => (

                        <div
                            key={question.id}
                            className="bg-white rounded-xl shadow p-6"
                        >

                            <h2 className="font-semibold text-lg">
                                {index + 1}. {question.questionText}
                            </h2>

                            <div className="mt-4 space-y-3">

                                {["A", "B", "C", "D"].map(option => (

                                    <label
                                        key={option}
                                        className="flex items-center gap-3 cursor-pointer"
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
                                            {question[`option${option}`]}
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
                    className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                    {submitting ? "Submitting..." : "Submit Quiz"}
                </button>

            </div>

        </div>
    );
}