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

  const calendarHours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23
  ];


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


  // Arrow signs for the mini calendar buttons
  const rightArrow = ">";
  const leftArrow = "<";


  const [events, setEvents] = useState([]);


  async function fetchEvents() {
  try {
    const [eventsResponse, tasksResponse, appointmentsResponse] =
      await Promise.all([
        fetch("https://simplecal-nf6h.onrender.com/events"),
        fetch("https://simplecal-nf6h.onrender.com/tasks"),
        fetch("https://simplecal-nf6h.onrender.com/appointments")
      ]);

    const eventsData = await eventsResponse.json();
    const tasksData = await tasksResponse.json();
    const appointmentsData = await appointmentsResponse.json();

    const allItems = [
      ...eventsData.map(item => ({
        ...item,
        type: "Event"
      })),

      ...tasksData.map(item => ({
        ...item,
        type: "Task"
      })),

      ...appointmentsData.map(item => ({
        ...item,
        type: "Appointment"
      }))
    ];

    setEvents(allItems);

  } catch (error) {
    console.error("Error fetching calendar items:", error);
  }
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


  const [selectedDay, setSelectedDay] = useState(todaysdate.getDate());

  function handlePrevDay() {

    const date = new Date(
      year,
      month,
      selectedDay
    );

    date.setDate(date.getDate() - 1);

    setSelectedDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }

  function handleNextDay() {

    const date = new Date(
      year,
      month,
      selectedDay
    );

    date.setDate(date.getDate() + 1);

    setSelectedDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }

  function getEventsForDay(day) {
    return events.filter((event) => {
      if (!event.date) return false;

      const eventDate = event.date.split("T")[0];

      const [eventYear, eventMonth, eventDay] =
        eventDate.split("-").map(Number);

      return (
        eventYear === year &&
        eventMonth - 1 === month &&
        eventDay === day
      );
    });
  }


  function getEventHour(time) {
    if (!time) return null;

    const timeString = time.toString().trim();

    // Handles: "9:00 AM", "9:30 PM"
    const amPmMatch = timeString.match(
      /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
    );

    if (amPmMatch) {
      let hour = Number(amPmMatch[1]);
      const period = amPmMatch[3].toUpperCase();

      if (period === "PM" && hour !== 12) {
        hour += 12;
      }

      if (period === "AM" && hour === 12) {
        hour = 0;
      }

      return hour;
    }

    // Handles: "09:00", "14:00", "9:00"
    const twentyFourHourMatch = timeString.match(
      /^(\d{1,2}):(\d{2})$/
    );

    if (twentyFourHourMatch) {
      return Number(twentyFourHourMatch[1]);
    }

    return null;
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredEvents = events.filter(event => {
  const q = searchQuery.toLowerCase();

  const matchesSearch =
    (event.title ?? "").toLowerCase().includes(q) ||
    (event.notes ?? "").toLowerCase().includes(q) ||
    (event.category ?? "").toLowerCase().includes(q);

  const matchesCategory =
    categoryFilter === "" ||
    (event.category ?? "").trim() === categoryFilter;

  const matchesType =
    typeFilter === "" ||
    (event.type ?? "").trim() === typeFilter;

  return matchesSearch && matchesCategory && matchesType;
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
  }, [searchQuery, categoryFilter,typeFilter]);



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
        <a>  Hello </a>
        <a> Hello </a>
        <input className="cal-events-search-input" type="search" placeholder="Search events, tasks or appointments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        {/* Navigate to the events page */}
        <button className="cal-events-btn " onClick={() => navigate("/event")}> Create Events</button>
        <button className="cal-tasks-btn" onClick={() => navigate("/task")}> Create Tasks </button>
        <button className="cal-appointments-btn" onClick={() => navigate("/appointment")}> Create Appointments </button>
        <button className="cal-signout-btn" onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className="cal-main">
        <div className="cal-section-header">
          <div className="cal-section-title">
            <span className="material-symbols-outlined">
              calendar_month
            </span>

            <div>
              <h1>Calendar</h1>
              <p>View your schedule and upcoming events</p>
            </div>
          </div>
        </div>
        <div className="cal-calendar-layout">
          <div className="cal-schedule">

            {/* Calendar Header */}

            <div className="cal-calendar-header">

              <div className="cal-date-navigation">
                <button className="cal-nav-button"
                  onClick={handlePrevDay}>&lt;</button>

                <h2>{months[month]} {selectedDay}, {year}</h2>

                <button className="cal-nav-button" onClick={handleNextDay}>&gt;</button>
              </div>

              <div className="cal-view-buttons">
                <button className="cal-today-button"
                  onClick={() => {
                    const today = new Date();

                    setSelectedDay(today.getDate());
                    setMonth(today.getMonth());
                    setYear(today.getFullYear());
                  }}>
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
                <div>12:00 AM</div>
                <div> 1:00 AM</div>
                <div> 2:00 AM</div>
                <div> 3:00 AM</div>
                <div> 4:00 AM</div>
                <div> 5:00 AM</div>
                <div> 6:00 AM</div>
                <div> 7:00 AM </div>
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
                <div>6:00 PM</div>
                <div>7:00 PM</div>
                <div>8:00 PM</div>
                <div>9:00 PM</div>
                <div>10:00 PM</div>
                <div>11:00 PM</div>
              </div>


              {/* Schedule */}
              <div className="cal-schedule-column">

                {calendarHours.map((hour) => {

                  const hourEvents = getEventsForDay(selectedDay).filter((event) => {
                    return getEventHour(event.time) === hour;
                  });

                  return (
                    <div
                      className="cal-time-slot"
                      key={hour}
                    >
                      {hourEvents.map((event) => (
                        <div
                          key={event._id}
                          className={`cal-calendar-event ${(event.category || "other").toLowerCase()
                            }`}
                        >
                          <strong>{event.title}</strong>

                          <span>{event.time}</span>

                          <span className="cal-event-category-small">
                            {event.category}</span>

                          {event.notes && (
                            <span className="cal-event-description">
                              {event.notes}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}

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
                    onClick={() => {
                      if (d !== null) {
                        setSelectedDay(d);
                      }
                    }}
                  >
                    {d ?? ""}

                    {hasEvent && <span className="cal-event-dot"></span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="cal-section-header">
          <div className="cal-section-title">
            <span className="material-symbols-outlined">
              event
            </span>

            <div>
              <h2> Events, Tasks and Appointments</h2>
              <p>View, filter, search, edit and manage your scheduled items</p>
            </div>
          </div>
        </div>
        <div className="cal-filter-category">
          <select className="cal-category-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value=""> Category </option>
            <option value="Work"> Work </option>
            <option value="Home"> Home </option>
            <option value="Meetup"> Meetup </option>
            <option value="other"> Other </option>
          </select>
          <select className="cal-category-select" value={typeFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value=""> Calender Type </option>
            <option value="Event"> Event</option>
            <option value="Task"> Task </option>
            <option value="Appointment"> Appointment </option>
          </select>
        </div>
        <div className="cal-container"></div>
        <div className="cal-container">
          <div className="cal-show-events">
            {displayedEvents.length > 0 ? (displayedEvents.map((event) => (
              <div key={event._id}
                className="cal-event"
                onClick={() =>
                  navigate("/edit", {
                    state: {
                      event,
                      isEditing: true,
                    },
                  })
                }>
                <h3 className="cal-event-title"> {event.title}  </h3>
                <p className="cal-event-date">{event.date}</p>
                  <p className="cal-event-type"> {event.type}</p>
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
                <br />
                <button
                  className="cal-edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate("/edit", {
                      state: {
                        item: event,
                        type: event.type || "Event"
                      }
                    });
                  }}
                >
                  Edit
                </button>
              </div>
            ))
            ) : (
              <p>  No events found </p>
            )}
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
      <Footer />
    </div>
  );
}

export default Calendar;