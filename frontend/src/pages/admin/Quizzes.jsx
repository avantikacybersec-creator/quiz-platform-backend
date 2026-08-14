import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            setLoading(true);
            setError("");

            const [quizResponse, categoryResponse] = await Promise.all([
                api.get("/admin/quizzes"),
                api.get("/admin/categories")
            ]);

            setQuizzes(quizResponse.data);
            setCategories(categoryResponse.data);

        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "Unable to load quizzes."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("Quiz title is required.");
            return;
        }

        if (!categoryId) {
            setError("Please select a category.");
            return;
        }

        try {
            setCreating(true);
            setError("");

            await api.post("/admin/quizzes", {
                title: title.trim(),
                description: description.trim(),
                categoryId: Number(categoryId)
            });

            setTitle("");
            setDescription("");
            setCategoryId("");

            await fetchData();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to create quiz."
            );
        } finally {
            setCreating(false);
        }
    };

    return (
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <div>
                    <h3 className="text-xl font-bold text-slate-900">
                        Quiz Management
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        Create and manage quizzes
                    </p>
                </div>

                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
                    {quizzes.length}{" "}
                    {quizzes.length === 1 ? "Quiz" : "Quizzes"}
                </div>

            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Create Quiz */}
            <form
                onSubmit={handleCreate}
                className="bg-slate-50 rounded-xl p-5 border border-slate-200"
            >

                <h4 className="font-semibold text-slate-800 mb-4">
                    Create New Quiz
                </h4>

                <div className="grid md:grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Quiz Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Java Basics Quiz"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Category
                        </label>

                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">
                                Select category
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe this quiz..."
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={creating}
                    className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
                >
                    {creating ? "Creating..." : "+ Create Quiz"}
                </button>

            </form>

            {/* Quiz List */}
            <div className="mt-8">

                <div className="flex justify-between items-center mb-4">

                    <h4 className="font-semibold text-slate-800">
                        Available Quizzes
                    </h4>

                    <button
                        onClick={fetchData}
                        className="text-sm text-blue-600 font-medium hover:text-blue-800"
                    >
                        Refresh
                    </button>

                </div>

                {loading ? (

                    <div className="py-10 text-center text-slate-500">
                        Loading quizzes...
                    </div>

                ) : quizzes.length === 0 ? (

                    <div className="border border-dashed border-slate-300 rounded-xl p-8 text-center">

                        <div className="text-3xl mb-2">
                            📝
                        </div>

                        <p className="font-medium text-slate-700">
                            No quizzes yet
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                            Create your first quiz above.
                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {quizzes.map((quiz) => (

                            <div
                                key={quiz.id}
                                className="border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition"
                            >

                                <div className="flex justify-between items-start">

                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
                                        📝
                                    </div>

                                    <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
                                        Active
                                    </span>

                                </div>

                                <h5 className="font-bold text-slate-900 mt-4">
                                    {quiz.title}
                                </h5>

                                <p className="text-sm text-slate-500 mt-1">
                                    {quiz.description || "No description"}
                                </p>

                                <div className="mt-4 pt-4 border-t border-slate-100">

                                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                                        {quiz.category?.name || "No category"}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </section>
    );
}