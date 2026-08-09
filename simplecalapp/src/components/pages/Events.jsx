import { useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import './style/Calendarstyle.css';

function Events() {

const location = useLocation();

const selectedEvent = location.state?.event;

 const navigate = useNavigate();

  // Switch between the edit section and the add event section
  const [isEditing, setisEditing] = useState(location.state?.isEditing || false);

  const [formData, setFormData] = useState(selectedEvent || {
    title: "",
    date: "",
    time: "",
    notes: "",
    category: "",
    image: ""
  });


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
     await fetch(
    `https://simplecal-nf6h.onrender.com/events/${formData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    navigate("/");
  }
  // DELETE EVENT 
  async function handleDelete(e) {
    console.log(formData);
    e.preventDefault();
    await fetch(
      `https://simplecal-nf6h.onrender.com/events/${formData._id}`,
      {
        method: "DELETE",
      }
    );


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
      <div className="event-main">
        <br/>
        {isEditing && (
          <p className="event-deleteorupdate">
            To delete or update an event <b> go back to the calander page</b> and <b> click on the image </b> of the event  you want to delete or update.
          </p>
        )}
             <br/>
             <br/>
             <br/>
        <form className="event-form" onSubmit={isEditing ? handleUpdate : handleSubmit}>
          <div className="event-form-group1">
            <label id="title-label" htmlFor="title"> Title </label>
            <label id="date-label" htmlFor="date"> Date </label>
            <br />
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
            <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="event-form-group2">
            <label htmlFor="time"> Time </label>
            <input type="time" name="time" id="time" value={formData.time} onChange={handleChange} required />
            <label htmlFor="notes"> Notes </label>
            <input type="text" name="notes" id="notes" value={formData.notes} onChange={handleChange} required />
            <label htmlFor="category"> Category</label>
            <select className="" name="category" id="category" value={formData.category} onChange={handleChange} required>
              <option value="">  select category </option>
              <option value="Work"> Work </option>
              <option value="Home"> Home </option>
              <option value="Meetup"> Meetup </option>
              <option value="other"> Other </option>
            </select>
            <label htmlFor="image"> Image URL (Optional) </label>
            <input type="text" name="image" id="image" value={formData.image} onChange={handleChange} />
            <button type="submit" className="events-submit-btn">
              {isEditing ? "Update Event" : "Add Event"} </button>
            {/* DELETE BUTTON (only in edit mode) */}
            {isEditing && (
              <button className="events-delete-btn"
                type="button"
                onClick={handleDelete}>
                Delete Event
              </button>
            )}
            {/* Toggle Button */}
            <button className="event-toggle-btn" type="button" onClick={() => {
              setisEditing(!isEditing)
              setFormData({
                title: "",
                date: "",
                time: "",
                notes: "",
                category: "",
                image: ""
              });
            }}>
              {isEditing ? "Switch to Add Event" : "Switch to Edit Event"}
            </button>
          </div>
        </form>
      </div>
      <footer className="cal-footer">
        <p> SimpleCal copyright@ 2026 </p>
      </footer>
    </div>
  );
}

export default Events;