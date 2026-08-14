import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    const fetchCategories = async () => {
        try {
            setLoading(true);

            const response = await api.get("/admin/categories");

            setCategories(response.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load categories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Category name is required.");
            return;
        }

        try {
            setCreating(true);
            setError("");

            await api.post("/admin/categories", {
                name: name.trim(),
                description: description.trim()
            });

            setName("");
            setDescription("");

            await fetchCategories();

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to create category."
            );
        } finally {
            setCreating(false);
        }
    };

    return (
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>
                    <h3 className="text-xl font-bold text-slate-900">
                        Category Management
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                        Organize quizzes by category
                    </p>
                </div>

                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
                    {categories.length}{" "}
                    {categories.length === 1 ? "Category" : "Categories"}
                </div>

            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Create Category */}
            <form
                onSubmit={handleCreate}
                className="bg-slate-50 rounded-xl p-5 border border-slate-200"
            >

                <h4 className="font-semibold text-slate-800 mb-4">
                    Add New Category
                </h4>

                <div className="grid md:grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Category Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Java"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Description
                        </label>

                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g. Java programming and development"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={creating}
                    className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    {creating ? "Creating..." : "+ Create Category"}
                </button>

            </form>

            {/* Categories */}
            <div className="mt-6">

                <div className="flex items-center justify-between mb-4">

                    <h4 className="font-semibold text-slate-800">
                        Categories
                    </h4>

                    <button
                        onClick={fetchCategories}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Refresh
                    </button>

                </div>

                {loading ? (

                    <div className="py-10 text-center text-slate-500">
                        Loading categories...
                    </div>

                ) : categories.length === 0 ? (

                    <div className="border border-dashed border-slate-300 rounded-xl p-8 text-center">

                        <div className="text-3xl mb-2">
                            📂
                        </div>

                        <p className="font-medium text-slate-700">
                            No categories yet
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                            Create your first category above.
                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {categories.map((category) => (

                            <div
                                key={category.id}
                                className="border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition"
                            >

                                <div className="flex items-start justify-between">

                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
                                        📚
                                    </div>

                                    <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
                                        Active
                                    </span>

                                </div>

                                <h5 className="font-bold text-slate-900 mt-4">
                                    {category.name}
                                </h5>

                                <p className="text-sm text-slate-500 mt-1">
                                    {category.description || "No description"}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}
