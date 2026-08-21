import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Questions() {
    const [quizzes, setQuizzes] = useState([]);
    const [questions, setQuestions] = useState([]);

    const [selectedQuiz, setSelectedQuiz] = useState("");

    const [questionText, setQuestionText] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");

    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            const response = await api.get("/admin/quizzes");
            setQuizzes(response.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load quizzes.");
        } finally {
            setLoading(false);
        }
    };

    const fetchQuestions = async (quizId) => {
        if (!quizId) {
            setQuestions([]);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/admin/questions/quiz/${quizId}`
            );

            setQuestions(response.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load questions.");
        } finally {
            setLoading(false);
        }
    };

    const handleQuizChange = (e) => {
        const quizId = e.target.value;

        setSelectedQuiz(quizId);
        fetchQuestions(quizId);
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        setError("");

        if (!selectedQuiz) {
            setError("Please select a quiz.");
            return;
        }

        if (
            !questionText.trim() ||
            !optionA.trim() ||
            !optionB.trim() ||
            !optionC.trim() ||
            !optionD.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (!correctAnswer) {
            setError("Please select the correct answer.");
            return;
        }

        try {
            setCreating(true);

            await api.post("/admin/questions", {
                questionText: questionText.trim(),
                optionA: optionA.trim(),
                optionB: optionB.trim(),
                optionC: optionC.trim(),
                optionD: optionD.trim(),
                correctAnswer,
                quizId: Number(selectedQuiz)
            });

            setQuestionText("");
            setOptionA("");
            setOptionB("");
            setOptionC("");
            setOptionD("");
            setCorrectAnswer("");

            await fetchQuestions(selectedQuiz);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to create question."
            );
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this question?")) {
            return;
        }

        try {
            await api.delete(`/admin/questions/${id}`);
            await fetchQuestions(selectedQuiz);
        } catch (err) {
            console.error(err);
            setError("Unable to delete question.");
        }
    };

    return (
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            {/* Header */}

            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                    Question Management
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                    Create and manage questions for your quizzes
                </p>
            </div>

            {/* Error */}

            {error && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Quiz selector */}

            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Quiz
                </label>

                <select
                    value={selectedQuiz}
                    onChange={handleQuizChange}
                    className="w-full md:w-1/2 px-4 py-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">
                        -- Select a Quiz --
                    </option>

                    {quizzes.map((quiz) => (
                        <option key={quiz.id} value={quiz.id}>
                            {quiz.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Add question */}

            {selectedQuiz && (
                <form
                    onSubmit={handleCreate}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-5"
                >
                    <h4 className="font-semibold text-slate-800 mb-4">
                        Add New Question
                    </h4>

                    <textarea
                        value={questionText}
                        onChange={(e) =>
                            setQuestionText(e.target.value)
                        }
                        rows="3"
                        placeholder="Enter question..."
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="grid md:grid-cols-2 gap-4 mt-4">

                        <input
                            value={optionA}
                            onChange={(e) => setOptionA(e.target.value)}
                            placeholder="Option A"
                            className="px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            value={optionB}
                            onChange={(e) => setOptionB(e.target.value)}
                            placeholder="Option B"
                            className="px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            value={optionC}
                            onChange={(e) => setOptionC(e.target.value)}
                            placeholder="Option C"
                            className="px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            value={optionD}
                            onChange={(e) => setOptionD(e.target.value)}
                            placeholder="Option D"
                            className="px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Correct answer */}

                    <div className="mt-5">
                        <p className="text-sm font-medium text-slate-700 mb-3">
                            Correct Answer
                        </p>

                        <div className="flex gap-6">

                            {["A", "B", "C", "D"].map((answer) => (
                                <label
                                    key={answer}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="correctAnswer"
                                        value={answer}
                                        checked={correctAnswer === answer}
                                        onChange={(e) =>
                                            setCorrectAnswer(
                                                e.target.value
                                            )
                                        }
                                    />

                                    Option {answer}
                                </label>
                            ))}

                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={creating}
                        className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
                    >
                        {creating
                            ? "Creating..."
                            : "+ Add Question"}
                    </button>
                </form>
            )}

            {/* Questions list */}

            {selectedQuiz && (
                <div className="mt-8">

                    <h4 className="font-semibold text-slate-800 mb-4">
                        Questions ({questions.length})
                    </h4>

                    {loading ? (
                        <div className="py-8 text-center text-slate-500">
                            Loading...
                        </div>
                    ) : questions.length === 0 ? (
                        <div className="border border-dashed border-slate-300 rounded-xl p-8 text-center">
                            <div className="text-3xl mb-2">
                                ❓
                            </div>

                            <p className="font-medium text-slate-700">
                                No questions yet
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                                Add your first question above.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">

                            {questions.map((question, index) => (
                                <div
                                    key={question.id}
                                    className="border border-slate-200 rounded-xl p-5"
                                >

                                    <div className="flex justify-between gap-4">

                                        <p className="font-semibold text-slate-900">
                                            {index + 1}.{" "}
                                            {question.questionText}
                                        </p>

                                        <button
                                            onClick={() =>
                                                handleDelete(question.id)
                                            }
                                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3 mt-4">

                                        {["A", "B", "C", "D"].map(
                                            (letter) => (
                                                <div
                                                    key={letter}
                                                    className={`p-3 rounded-lg border ${
                                                        question.correctAnswer ===
                                                        letter
                                                            ? "bg-green-50 border-green-200 text-green-800"
                                                            : "bg-slate-50 border-slate-200 text-slate-700"
                                                    }`}
                                                >
                                                    <strong>
                                                        {letter}.
                                                    </strong>{" "}
                                                    {
                                                        question[
                                                            `option${letter}`
                                                        ]
                                                    }
                                                </div>
                                            )
                                        )}

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>
            )}

        </section>
    );
}