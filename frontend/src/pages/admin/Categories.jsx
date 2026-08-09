import { useEffect, useState } from "react";
import api from "../../api/axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/admin/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    try {
      setLoading(true);

      await api.post("/admin/categories", {
        name,
        description,
      });

      setName("");
      setDescription("");

      await fetchCategories();
    } catch (error) {
      console.error("Failed to create category", error);
      alert("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Category Management</h1>

      <form onSubmit={handleCreate}>
        <div>
          <label>Category Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>

      <hr />

      <h2>Categories</h2>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <strong>{category.name}</strong>
              {" - "}
              {category.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categories;