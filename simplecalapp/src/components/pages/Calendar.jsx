import "./style/Calendarstyle.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../Footer.jsx";
import CalendarHeader from "../CalendarHeader.jsx";
import MonthView from "../MonthView.jsx";
import DayView from "../DayView.jsx";
import MiniCalendar from "../MiniCalendar.jsx";
import CalendarFilters from "../CalendarFilters.jsx";
import CalendarItemList from "../CalendarItemList.jsx";

import {
  getCalendarItemsForDay,
  getCalendarDaysWithItems,
} from "../calendarUtils.js";

function Calendar() {
  const navigate = useNavigate();

  const todayDate = new Date();

  // -------------------------
  // Calendar state
  // -------------------------

  const [month, setMonth] = useState(todayDate.getMonth());
  const [year, setYear] = useState(todayDate.getFullYear());

  const [selectedDay, setSelectedDay] = useState(todayDate.getDate());
  const [selectedDate, setSelectedDate] = useState(todayDate);

  const [view, setView] = useState("month");

  // -------------------------
  // Calendar items
  // -------------------------

  const [calendarItems, setCalendarItems] = useState([]);

  // -------------------------
  // Search / filters
  // -------------------------

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // -------------------------
  // Pagination
  // -------------------------

  const [calendarItemPage, setCalendarItemPage] = useState(0);

  const calendarItemsPerPage = 6;

  // -------------------------
  // Fetch calendar items
  // -------------------------

  async function fetchCalendarItems() {
    const token = localStorage.getItem("token");

    try {
      const [
        eventsResponse,
        tasksResponse,
        appointmentsResponse,
      ] = await Promise.all([
        fetch("https://simplecal-nf6h.onrender.com/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch("https://simplecal-nf6h.onrender.com/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch("https://simplecal-nf6h.onrender.com/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const eventsData = await eventsResponse.json();
      const tasksData = await tasksResponse.json();
      const appointmentsData = await appointmentsResponse.json();

      const allItems = [
        ...(Array.isArray(eventsData) ? eventsData : []).map((item) => ({
          ...item,
          type: "Event",
        })),

        ...(Array.isArray(tasksData) ? tasksData : []).map((item) => ({
          ...item,
          type: "Task",
        })),

        ...(Array.isArray(appointmentsData)
          ? appointmentsData
          : []
        ).map((item) => ({
          ...item,
          type: "Appointment",
        })),
      ];

      setCalendarItems(allItems);
    } catch (error) {
      console.error("Error fetching calendar items:", error);
    }
  }

  useEffect(() => {
    fetchCalendarItems();
  }, []);

  // -------------------------
  // Month navigation
  // -------------------------

  function handlePrevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function handleNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  // -------------------------
  // Day navigation
  // -------------------------

  function handlePrevDay() {
    const newDate = new Date(selectedDate);

    if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }

    setSelectedDate(newDate);
    setSelectedDay(newDate.getDate());
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  }

  function handleNextDay() {
    const newDate = new Date(selectedDate);

    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }

    setSelectedDate(newDate);
    setSelectedDay(newDate.getDate());
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  }

  // -------------------------
  // Today button
  // -------------------------

  function handleToday() {
    const today = new Date();

    setSelectedDate(today);
    setSelectedDay(today.getDate());
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  }

  // -------------------------
  // Select a day
  // -------------------------

  function handleSelectDay(day) {
    const newDate = new Date(`${day.date}T00:00:00`);

    setSelectedDate(newDate);
    setSelectedDay(newDate.getDate());
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());

    setView("day");
  }

  // -------------------------
  // Search/filter
  // -------------------------

  const filteredCalendarItems = calendarItems.filter((item) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      (item.title ?? "").toLowerCase().includes(q) ||
      (item.notes ?? "").toLowerCase().includes(q) ||
      (item.category ?? "").toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === "" ||
      (item.category ?? "").trim() === categoryFilter;

    const matchesType =
      typeFilter === "" ||
      (item.type ?? "").trim() === typeFilter;

    return matchesSearch && matchesCategory && matchesType;
  });

  // -------------------------
  // Pagination
  // -------------------------

  const totalPages = Math.ceil(
    filteredCalendarItems.length / calendarItemsPerPage
  );

  const displayedCalendarItems = filteredCalendarItems.slice(
    calendarItemPage * calendarItemsPerPage,
    (calendarItemPage + 1) * calendarItemsPerPage
  );

  useEffect(() => {
    setCalendarItemPage(0);
  }, [searchQuery, categoryFilter, typeFilter]);

  // -------------------------
  // Items for selected day
  // -------------------------

  const selectedDayItems = getCalendarItemsForDay(
    calendarItems,
    selectedDay,
    month,
    year
  );

  // -------------------------
  // Days that contain items
  // -------------------------

  const calendarDaysWithItems = getCalendarDaysWithItems(
    calendarItems,
    month,
    year
  );

  // -------------------------
  // Sign out
  // -------------------------

  function handleSignOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  // -------------------------
  // Render
  // -------------------------

  return (
    <div className="cal-background">

      <CalendarHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreateEvent={() => navigate("/event")}
        onCreateTask={() => navigate("/task")}
        onCreateAppointment={() => navigate("/appointment")}
        onSignOut={handleSignOut}
      />

      <div className="cal-main">

        {/* Page heading */}
        <div className="cal-section-header">
          <div className="cal-section-title">
            <span className="material-symbols-outlined">
              calendar_month
            </span>

            <div>
              <h1>Calendar</h1>
              <p>
                View your schedule and upcoming events, tasks,
                and appointments
              </p>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="cal-calendar-layout">

          <div className="cal-schedule">

            <div className="cal-calendar-header">

              <div className="cal-date-navigation">
                <button
                  className="cal-nav-button"
                  onClick={handlePrevDay}
                >
                  &lt;
                </button>

                <h2>
                  {new Date(
                    year,
                    month,
                    selectedDay
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h2>

                <button
                  className="cal-nav-button"
                  onClick={handleNextDay}
                >
                  &gt;
                </button>
              </div>

              <div className="cal-view-buttons">

                <button
                  className="cal-today-button"
                  onClick={handleToday}
                >
                  Today
                </button>

                <button
                  className={`cal-view-button ${
                    view === "month" ? "active" : ""
                  }`}
                  onClick={() => setView("month")}
                >
                  Month
                </button>

                <button
                  className={`cal-view-button ${
                    view === "day" ? "active" : ""
                  }`}
                  onClick={() => setView("day")}
                >
                  Day
                </button>

              </div>
            </div>

            <div className="cal-calendar-body">

              {view === "month" && (
                <MonthView
                  month={month}
                  year={year}
                  calendarItems={displayedCalendarItems}
                  onSelectDay={handleSelectDay}
                />
              )}

              {view === "day" && (
                <DayView
                  calendarItems={selectedDayItems}
                />
              )}

            </div>
          </div>

          {/* Mini calendar */}
          <MiniCalendar
            month={month}
            year={year}
            selectedDay={selectedDay}
            calendarDaysWithItems={calendarDaysWithItems}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onSelectDay={(day) => setSelectedDay(day)}
          />

        </div>

        {/* Items section */}
        <div className="cal-section-header">
          <div className="cal-section-title">

            <span className="material-symbols-outlined">
              event
            </span>

            <div>
              <h2>Events, Tasks and Appointments</h2>

              <p>
                View, filter, search, edit and manage your
                scheduled items
              </p>
            </div>

          </div>
        </div>

        {/* Filters */}
        <CalendarFilters
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />

        {/* Item cards */}
        <CalendarItemList
          calendarItems={displayedCalendarItems}
          navigate={navigate}
        />

        {/* Pagination */}
        <div className="calendaritem-pagination">

          <button
            onClick={() =>
              setCalendarItemPage(calendarItemPage - 1)
            }
            disabled={calendarItemPage === 0}
          >
            Previous
          </button>

          <span>
            Page {calendarItemPage + 1} of {totalPages || 1}
          </span>

          <button
            onClick={() =>
              setCalendarItemPage(calendarItemPage + 1)
            }
            disabled={
              calendarItemPage >= totalPages - 1
            }
          >
            Next
          </button>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Calendar;