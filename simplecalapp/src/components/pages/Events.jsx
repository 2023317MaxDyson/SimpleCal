import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './style/Calendarstyle.css';

function Events() {

  const navigate = useNavigate();

  // Switch between the edit section and the add event section
  const [isEditing, setisEditing] = useState(false);

  const [eventId, setEventId] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    time: "",
    notes: "",
    category: "",
    image: ""
  })


  // Load event when eventId changes
  useEffect(() => {
    if (!isEditing || !eventId) return;

    async function fetchEvent() {
      const res = await fetch(`https://simplecal-nf6h.onrender.com/events/${eventId}`);

      const data = await res.json();
      setFormData(data);
    }
    fetchEvent();
  }, [eventId, isEditing]);



  // ADD EVENT 
  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`https://simplecal-nf6h.onrender.com/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    // After submitting the form, navigate back to the Calander page 
    navigate("/");
  }

  // EDIT EVENT
  async function handleUpdate(e) {
    e.preventDefault();
    await fetch(`https://simplecal-nf6h.onrender.com/events/${eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    navigate("/");
  }

  // DELETE EVENT 
  async function handleDelete(e) {
    if (!eventId) return alert("Please enter an event ID to delete");
    e.preventDefault();
    await fetch(`https://simplecal-nf6h.onrender.com/events/${eventId}`, {
      method: "DELETE"
    })
    navigate("/");
  }

  function handleChange(e) {
    setFormData({
      ...formData,              // keep all existing fields
      [e.target.name]: e.target.value  // update the one that changed
    });
  }


  return (
    <div className="cal-background">
      <div className="cal-header">
        <span className="material-symbols-outlined">
          calendar_month
        </span>
        <p className="cal-title"> SimpleCal </p>
        {/* Navigate back to the Calendar page */}
        <button className="events-calendar-btn" onClick={() => navigate("/")}>Calendar</button>
      </div>
      <div className="cal-main">
        {/* Toggle Button */}
        <button className="event-toggle-btn" onClick={() => {
          setisEditing(!isEditing)
          setFormData({
            title: "",
            time: "",
            notes: "",
            category: "",
            image: ""
          });
          setEventId("");
        }}>
          {isEditing ? "Switch to Add Event" : "Switch to Edit Event"}
        </button>
        {/* If editing, show event ID input */}
        {isEditing && (
          <input
            type="text"
            placeholder="Enter Event ID to Edit"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
        )}
        <form className="event-form" onSubmit={isEditing ? handleUpdate : handleSubmit}>
          <label htmlFor="title"> Title </label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
          <label htmlFor="date"> Date </label>
          <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required />
          <label htmlFor="time"> Time </label>
          <input type="text" name="time" id="time" value={formData.time} onChange={handleChange} required />
          <label htmlFor="notes"> Notes </label>
          <input type="text" name="notes" id="notes" value={formData.notes} onChange={handleChange} required />
          <label htmlFor="category"> Category</label>
          <select className="cal-category-select" name="category" id="category" value={formData.category} onChange={handleChange} required>
            <option value="">  select category </option>
            <option value="Work"> Work </option>
            <option value="School"> School </option>
            <option value="Home"> Home </option>
            <option value="Meetup"> Meetup </option>
            <option value="other"> Other </option>
          </select>
          <label htmlFor="image"> Image URL </label>
          <input type="text" name="image" id="image" value={formData.image} onChange={handleChange} required />
          <button type="submit" className="events-submit-btn">
            {isEditing ? "Update Event" : "Add Event"} </button>
        </form>
        {/* DELETE BUTTON (only in edit mode) */}
        {isEditing && (
          <button className="delete-btn"
            onClick={handleDelete}>
            Delete Event
          </button>

        )}
      </div>
      <footer className="cal-footer">
        <p> SimpleCal copyright@ 2026 </p>
      </footer>
    </div>
  );
}

export default Events;