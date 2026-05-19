import { useState } from "react";
import { createEvent } from "../services/eventService";
function Admin() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("History");
  const [difficulty, setDifficulty] = useState("Easy");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title || !year) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const newEvent = {
      title,
      year: Number(year),
      category,
      difficulty
    };

   try {
  await createEvent(newEvent);

  setMessage("Event added successfully.");
}catch (error) {
  console.error(error);

  const errorMessage =
    error.response?.data || "Could not add event.";

  setMessage(errorMessage);
  return;
}

    setTitle("");
    setYear("");
    setCategory("History");
    setDifficulty("Easy");
  }

  return (
    <section>
      <div className="page-heading">
        <h1>Admin Panel</h1>
        <p>Add timeline events that players can guess.</p>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <label>Event Title</label>
        <input
          type="text"
          placeholder="Example: Google was founded"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label>Correct Year</label>
        <input
          type="number"
          placeholder="Example: 1998"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />

        <label>Category</label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option>History</option>
          <option>Technology</option>
          <option>Science</option>
          <option>Sports</option>
          <option>Movies</option>
          <option>Music</option>
          <option>Books</option>
        </select>

        <label>Difficulty</label>
        <select
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button type="submit">Add Event</button>
      </form>

      {message && <p className="feedback">{message}</p>}
    </section>
  );
}

export default Admin;