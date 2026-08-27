import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Calendarstyle.css";

function Tasks() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    notes: "",
    category: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://simplecal-nf6h.onrender.com/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      navigate("/calendar");

    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  return (
    <div className="cal-background">

      {/* HEADER */}
      <div className="cal-header">

        <span className="material-symbols-outlined">
          calendar_month
        </span>

        <p className="cal-title">
          SimpleCal
        </p>

        <button
          className="tasks-calendar-btn"
          onClick={() => navigate("/calendar")}
        >
        Back to the Calendar
        </button>

      </div>


      {/* TASK PAGE */}
      <main className="task-main">

        <div className="task-page-header">

          <div>
            <h1>Create a Task</h1>

            <p>
              Add a task to your SimpleCal schedule.
            </p>
          </div>

        </div>


        {/* TASK FORM */}
        <form
          className="task-form"
          onSubmit={handleSubmit}
        >

          {/* TITLE + DATE */}
          <div className="task-form-group1">

            <div className="task-field">

              <label htmlFor="title">
                Title
              </label>

              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            <div className="task-field">

              <label htmlFor="date">
                Date
              </label>

              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* TIME */}
          <div className="task-form-group2">

            <div className="task-field">

              <label htmlFor="time">
                Time
              </label>

              <input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                required
              />

            </div>


            {/* NOTES */}
            <div className="task-field">

              <label htmlFor="notes">
                Notes
              </label>

              <textarea
                name="notes"
                id="notes"
                placeholder="Add notes about this task..."
                value={formData.notes}
                onChange={handleChange}
                required
              />

            </div>


            {/* CATEGORY */}
            <div className="task-field">

              <label htmlFor="category">
                Category
              </label>

              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select category
                </option>

                <option value="Work">
                  Work
                </option>

                <option value="Home">
                  Home
                </option>

                <option value="Meetup">
                  Meetup
                </option>

                <option value="other">
                  Other
                </option>

              </select>

            </div>


            {/* BUTTON */}
            <button
              type="submit"
              className="task-submit-btn"
            >
              Add Task
            </button>

          </div>

        </form>

      </main>


      {/* FOOTER */}
      <footer className="cal-footer">

        <p>
          SimpleCal copyright © 2026
        </p>

      </footer>

    </div>
  );
}

export default Tasks;