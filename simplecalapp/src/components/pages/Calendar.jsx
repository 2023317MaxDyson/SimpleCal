import './style/Calendarstyle.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer.jsx";
function Calendar() {


  // Variable for navigation
  const navigate = useNavigate();

  const todaysdate = new Date();

  const [month, setMonth] = useState(todaysdate.getMonth());
  const [year, setYear] = useState(todaysdate.getFullYear());

  const today = todaysdate.getDate();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }


  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  function handlePrevMonth() {
    // If the month is Jan set it back to Dec when press the previous month 
    if (month === 0) {
      setMonth(11);
      // The year should go back one year 
      setYear(year - 1)
    }

    else {
      setMonth(month - 1);
    }

  }

  function handleNextMonth() {
    // If the month is Dec set it back to Jan when pressing the next month
    if (month === 11) {
      setMonth(0);
      // The year should go forward one year 
      setYear(year + 1)
    }
    else {
      setMonth(month + 1);
    }
  }

  // Arrow signs for the buttons
  const rightArrow = ">";
  const leftArrow = "<";


  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    const response = await fetch("https://simplecal-nf6h.onrender.com/events");
    const data = await response.json();
    setEvents(data);
  }

  useEffect(() => {
    async function load() {
      await fetchEvents();
    }
    load();
  }, []);


  const eventDays = events.filter(event => {
    if (!event.date) return false; // prevents crash

    const iso = event.date.split("T")[0]; // "2026-05-30"
    const [yearStr, monthStr, dayStr] = iso.split("-");

    const date = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));

    return date.getMonth() === month && date.getFullYear() === year;
  })
    .map(event => {
      if (!event.date) return null;

      const iso = event.date.split("T")[0];
      const day = iso.split("-")[2];
      return Number(day);
    })
    .filter(Boolean); // remove nulls


  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");


  const filteredEvents = events.filter(event => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (event.title ?? "").toLowerCase().includes(q) ||
      (event.notes ?? "").toLowerCase().includes(q) ||
      (event.category ?? "").toLowerCase().includes(q);

    const matchesCategory = categoryFilter === "" || (event.category ?? "").trim() === categoryFilter;

    return matchesSearch && matchesCategory;
  });


  const [eventPage, setEventPage] = useState(0);
  const eventsPerPage = 6;

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const displayedEvents = filteredEvents.slice(
    eventPage * eventsPerPage,
    (eventPage + 1) * eventsPerPage
  );

  useEffect(() => {
    setEventPage(0);
  }, [searchQuery, categoryFilter]);



  function handleSignOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="cal-background">
      <div className="cal-header">
        <span className="material-symbols-outlined">
          calendar_month
        </span>
        <p className="cal-title"> SimpleCal </p>
        <input className="cal-events-search-input" type="search" placeholder="Search events, tasks or appointments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        {/* Navigate to the events page */}
        <button className="cal-events-btn " onClick={() => navigate("/event")}> Create Events</button>
        <button className="cal-tasks-btn"> Create Tasks </button>
        <button className="cal-appointments-btn"> Create Appointments </button>
        <button className="cal-signout-btn" onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className="cal-main">
        <div>
        <div className="cal-filter-category">
          <select className="cal-category-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value=""> Category </option>
            <option value="Work"> Work </option>
            <option value="Home"> Home </option>
            <option value="Meetup"> Meetup </option>
            <option value="other"> Other </option>
          </select>
            <select className="cal-category-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value=""> Calender Type </option>
            <option value="Event"> Event</option>
            <option value="Task"> Task </option>
            <option value="Appointment"> Appointment </option>
          </select>
        </div>
        </div> 
        <div className="cal-container">
        <div className="cal-show-events">
          {displayedEvents.length > 0 ? (displayedEvents.map((event) => (
            <div key={event._id}
              className="cal-event"
              onClick={() =>
                navigate("/event", {
                  state: {
                    event,
                    isEditing: true,
                  },
                })
              }>
              <h3 className="cal-event-title"> {event.title}  </h3>
              <p className="cal-event-date">{event.date}</p>
              {event.image && (
                <img
                  className="cal-event-image"
                  src={event.image}
                  alt={event.title}
                />
              )}
              <p className="cal-event-time"> {event.time} </p>
              <p className="cal-event-notes"> {event.notes}</p>
              <p className="cal-event-category"> {event.category}</p>
            </div>
          ))
          ) : (
            <p> No events found </p>
          )}
        </div>
   </div>
   <div className="cal-calendar-layout">
   <div className="cal-schedule">

  {/* Calendar Header */}
  <div className="cal-calendar-header">

    <div className="cal-date-navigation">
      <button className="cal-nav-button">&lt;</button>

      <h2>August 13, 2026</h2>

      <button className="cal-nav-button">&gt;</button>
    </div>

    <div className="cal-view-buttons">
      <button className="cal-today-button">
        Today
      </button>

      <button className="cal-view-button active">
        Month
      </button>

      <button className="cal-view-button">
        Day
      </button>
    </div>

  </div>


  {/* Calendar Body */}
  <div className="cal-calendar-body">

    {/* Time Column */}
    <div className="cal-time-column">

      <div>8:00 AM</div>
      <div>9:00 AM</div>
      <div>10:00 AM</div>
      <div>11:00 AM</div>
      <div>12:00 PM</div>
      <div>1:00 PM</div>
      <div>2:00 PM</div>
      <div>3:00 PM</div>
      <div>4:00 PM</div>
      <div>5:00 PM</div>

    </div>


    {/* Schedule */}
    <div className="cal-schedule-column">

      <div className="cal-time-slot"></div>

      <div className="cal-time-slot">
        <div className="cal-calendar-event meeting">
          <strong>Meeting</strong>
          <span>9:00 AM - 10:00 AM</span>
        </div>
      </div>

      <div className="cal-time-slot"></div>

      <div className="cal-time-slot">
        <div className="cal-calendar-event lunch">
          <strong>Lunch</strong>
          <span>11:00 AM - 12:00 PM</span>
        </div>
      </div>

      <div className="cal-time-slot"></div>

      <div className="cal-time-slot"></div>

      <div className="cal-time-slot">
        <div className="cal-calendar-event project">
          <strong>Project Work</strong>
          <span>2:00 PM - 3:00 PM</span>
        </div>
      </div>

      <div className="cal-time-slot"></div>

      <div className="cal-time-slot"></div>

      <div className="cal-time-slot"></div>

    </div>

  </div>
</div>
        <div className="cal-minicalander ">
          <h2 className="cal-monthinyear"> {months[month]} / {year}  </h2>
          <div className="cal-filter">
            <button className="cal-left" onClick={handlePrevMonth}>  {leftArrow} </button>
            <button className="cal-right" onClick={handleNextMonth}> {rightArrow} </button>
          </div>
          <div className="cal-grid">
            {daysOfWeek.map((day) => {
              return (
                <div key={day} className="cal-daysofweek">
                  {day}
                </div>
              );
            })}
            {days.map((d, index) => {
              const isToday = d === today;
              const hasEvent = d !== null && eventDays.includes(d);
              return (
                <div
                  key={index}
                  className={`cal-days ${isToday ? "cal-today" : ""}`}
                  onClick={() => navigate(`/day/${year}-${month + 1}-${d}`)}
                >
                  {d ?? ""}

                  {hasEvent && <span className="cal-event-dot"></span>}
                </div>
              );
            })}
          </div>
        </div>
</div>
        <div className="event-pagination">
          <button onClick={() => setEventPage(eventPage - 1)} disabled={eventPage === 0} > Previous </button>
          <span>
            Page {eventPage + 1} of {totalPages || 1}
          </span>
          <button onClick={() => setEventPage(eventPage + 1)} disabled={eventPage >= totalPages - 1} > Next </button>
        </div>
      </div>
     <Footer/>
    </div>
  );
}

export default Calendar;