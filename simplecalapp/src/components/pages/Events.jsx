import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Calendarstyle.css";

function Events() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("https://simplecal-nf6h.onrender.com/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Backend error:", errorData);
      throw new Error(errorData.message || "Failed to create event");
    }

    const data = await response.json();

    console.log("Event created:", data);

    navigate("/calendar");

  } catch (error) {
    console.error("Error creating event:", error);
  }
};

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
        Back to Calendar
        </button>

      </div>


      <div className="event-main">

        <div className="event-page-header">

          <div>
            <h1>Create a Event</h1>

            <p>
              Add a event to your SimpleCal schedule.
            </p>
          </div>

        </div>

        <form
          className="event-form"
          onSubmit={handleSubmit}
        >

          <div className="event-form-group1">

            <label htmlFor="title" id="title-label">
              Title
            </label>

     <label htmlFor="date" id="date-label">
              Date
            </label>

            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

        
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
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
              value={formData.time}
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
              value={formData.notes}
              onChange={handleChange}
              required
            />
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
            <label htmlFor="image">
              Image URL (Optional)
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="events-submit-btn"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
      <footer className="cal-footer">
        <p>
          SimpleCal copyright@ 2026
        </p>
      </footer>

    </div>
  );
}

export default Events;