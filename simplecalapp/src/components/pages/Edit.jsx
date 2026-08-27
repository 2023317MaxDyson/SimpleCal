import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style/Calendarstyle.css";

function Edit() {

  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state?.item;
  const type = location.state?.type || "Event";

  const [formData, setFormData] = useState(item || {
    title: "",
    date: "",
    time: "",
    notes: "",
    category: "",
    image: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {

      const response = await fetch(
        `https://simplecal-nf6h.onrender.com/events/${formData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      navigate("/calendar");

    } catch (error) {
      console.error("Update error:", error);
    }
  }

  async function handleDelete() {

    const confirmed = window.confirm(
      `Are you sure you want to delete this ${type.toLowerCase()}?`
    );

    if (!confirmed) {
      return;
    }

    try {

      const response = await fetch(
        `https://simplecal-nf6h.onrender.com/events/${formData._id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      navigate("/calendar");

    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  if (!item) {
    return (
      <div className="cal-background">
        <h2>No item selected.</h2>

        <button onClick={() => navigate("/calendar")}>
          Back to Calendar
        </button>
      </div>
    );
  }

  return (
    <div className="cal-background">

      <div className="cal-header">

        <span className="material-symbols-outlined">
          calendar_month
        </span>

        <p className="cal-title">
          SimpleCal
        </p>

        <button
          className="events-calendar-btn"
          onClick={() => navigate("/calendar")}
        >
          Calendar
        </button>

      </div>


      <div className="event-main">

        <h2>
          Edit {type}
        </h2>

        <form
          className="event-form"
          onSubmit={handleUpdate}
        >

          <div className="event-form-group1">

            <label htmlFor="title">
              Title
            </label>

            <label htmlFor="date">
              Date
            </label>

            <br />

            <input
              type="text"
              name="title"
              id="title"
              value={formData.title || ""}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              id="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
            />

          </div>


          <div className="event-form-group2">

            <label htmlFor="time">
              Time
            </label>

            <input
              type="time"
              name="time"
              id="time"
              value={formData.time || ""}
              onChange={handleChange}
              required
            />


            <label htmlFor="notes">
              Notes
            </label>

            <input
              type="text"
              name="notes"
              id="notes"
              value={formData.notes || ""}
              onChange={handleChange}
            />


            <label htmlFor="category">
              Category
            </label>

            <select
              name="category"
              id="category"
              value={formData.category || ""}
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


            <label htmlFor="image">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              id="image"
              value={formData.image || ""}
              onChange={handleChange}
            />


            <button
              type="submit"
              className="events-submit-btn"
            >
              Update {type}
            </button>


            <button
              type="button"
              className="events-delete-btn"
              onClick={handleDelete}
            >
              Delete {type}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Edit;