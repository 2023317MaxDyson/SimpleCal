
import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Calendarstyle.css";
import Footer from "../Footer";

interface AppointmentFormData {
  title: string;
  date: string;
  time: string;
  notes: string;
  category: string;
}

function Appointments() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AppointmentFormData>({
    title: "",
    date: "",
    time: "",
    notes: "",
    category: "",
  });

  function handleChange(
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: SubmitEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://simplecal-nf6h.onrender.com/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      navigate("/calendar");
    } catch (error: unknown) {
      console.error(
        "Error creating appointment:",
        error
      );
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
          className="appointments-calendar-btn"
          onClick={() => navigate("/calendar")}
        >
          Back to the Calendar
        </button>

      </div>

      {/* Appointment PAGE */}
      <main className="appointment-main">

        <div className="appointment-page-header">

          <div>
            <h1>Create an Appointment</h1>

            <p>
              Add an appointment to your SimpleCal schedule.
            </p>
          </div>

        </div>

        {/* Appointment FORM */}
        <form
          className="appointment-form"
          onSubmit={handleSubmit}
        >

          {/* TITLE + DATE */}
          <div className="appointment-form-group1">

            <div className="appointment-field">

              <label htmlFor="title">
                Title
              </label>

              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter appointment title"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>

            <div className="appointment-field">

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
          <div className="appointment-form-group2">

            <div className="appointment-field">

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
            <div className="appointment-field">

              <label htmlFor="notes">
                Notes
              </label>

              <textarea
                name="notes"
                id="notes"
                placeholder="Add notes about this appointment..."
                value={formData.notes}
                onChange={handleChange}
                required
              />

            </div>

            {/* CATEGORY */}
            <div className="appointment-field">

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
              className="appointment-submit-btn"
            >
              Add appointment
            </button>

          </div>

        </form>

      </main>

      <Footer />

    </div>
  );
}

export default Appointments;
