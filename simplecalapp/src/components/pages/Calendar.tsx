
import "./style/Calendarstyle.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../Footer";
import CalendarHeader from "../CalendarHeader";
import MonthView from "../MonthView";
import DayView from "../DayView";
import MiniCalendar from "../MiniCalendar";
import CalendarFilters from "../CalendarFilters";
import CalendarItemList from "../CalendarItemList";

import {
  getCalendarItemsForDay,
  getCalendarDaysWithItems,
} from "../calendarUtils";

// ----------------------------------
// Types
// ----------------------------------

type CalendarItemType = "Event" | "Task" | "Appointment";

interface CalendarItem {
  _id: string;
  title: string;
  date: string;
  time?: string;
  notes?: string;
  category?: string;
  type: CalendarItemType;
  image?: string;
}

interface CalendarDay {
  date: string;
}

// ----------------------------------
// Calendar component
// ----------------------------------

function Calendar() {
  const navigate = useNavigate();

  const todayDate = new Date();

  // -------------------------
  // Calendar state
  // -------------------------

  const [month, setMonth] = useState<number>(
    todayDate.getMonth()
  );

  const [year, setYear] = useState<number>(
    todayDate.getFullYear()
  );

  const [selectedDay, setSelectedDay] = useState<number>(
    todayDate.getDate()
  );

  const [selectedDate, setSelectedDate] = useState<Date>(
    todayDate
  );

  const [view, setView] = useState<"month" | "day">("month");

  // -------------------------
  // Calendar items
  // -------------------------

  const [calendarItems, setCalendarItems] = useState<
    CalendarItem[]
  >([]);

  // -------------------------
  // Search / filters
  // -------------------------

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [categoryFilter, setCategoryFilter] =
    useState<string>("");

  const [typeFilter, setTypeFilter] =
    useState<string>("");

  // -------------------------
  // Pagination
  // -------------------------

  const [calendarItemPage, setCalendarItemPage] =
    useState<number>(0);

  const calendarItemsPerPage: number = 6;

  // -------------------------
  // Fetch calendar items
  // -------------------------

  async function fetchCalendarItems(): Promise<void> {
    const token = localStorage.getItem("token");

    try {
      const [
        eventsResponse,
        tasksResponse,
        appointmentsResponse,
      ] = await Promise.all([
        fetch(
          "https://simplecal-nf6h.onrender.com/events",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),

        fetch(
          "https://simplecal-nf6h.onrender.com/tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),

        fetch(
          "https://simplecal-nf6h.onrender.com/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);

      const eventsData: unknown =
        await eventsResponse.json();

      const tasksData: unknown =
        await tasksResponse.json();

      const appointmentsData: unknown =
        await appointmentsResponse.json();

      const allItems: CalendarItem[] = [
        ...(Array.isArray(eventsData)
          ? eventsData
          : []
        ).map(
          (item): CalendarItem => ({
            ...item,
            type: "Event",
          })
        ),

        ...(Array.isArray(tasksData)
          ? tasksData
          : []
        ).map(
          (item): CalendarItem => ({
            ...item,
            type: "Task",
          })
        ),

        ...(Array.isArray(appointmentsData)
          ? appointmentsData
          : []
        ).map(
          (item): CalendarItem => ({
            ...item,
            type: "Appointment",
          })
        ),
      ];

      setCalendarItems(allItems);
    } catch (error: unknown) {
      console.error(
        "Error fetching calendar items:",
        error
      );
    }
  }

  useEffect(() => {
    fetchCalendarItems();
  }, []);

  // -------------------------
  // Month navigation
  // -------------------------

  function handlePrevMonth(): void {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function handleNextMonth(): void {
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

  function handlePrevDay(): void {
    const newDate = new Date(selectedDate);

    if (view === "month") {
      newDate.setMonth(
        newDate.getMonth() - 1
      );
    } else {
      newDate.setDate(
        newDate.getDate() - 1
      );
    }

    setSelectedDate(newDate);
    setSelectedDay(newDate.getDate());
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  }

  function handleNextDay(): void {
    const newDate = new Date(selectedDate);

    if (view === "month") {
      newDate.setMonth(
        newDate.getMonth() + 1
      );
    } else {
      newDate.setDate(
        newDate.getDate() + 1
      );
    }

    setSelectedDate(newDate);
    setSelectedDay(newDate.getDate());
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
  }

  // -------------------------
  // Today button
  // -------------------------

  function handleToday(): void {
    const today = new Date();

    setSelectedDate(today);
    setSelectedDay(today.getDate());
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  }

  // -------------------------
  // Select a day
  // -------------------------

  function handleSelectDay(
    day: CalendarDay
  ): void {
    const newDate = new Date(
      `${day.date}T00:00:00`
    );

    setSelectedDate(newDate);
    setSelectedDay(newDate.getDate());
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());

    setView("day");
  }

  // -------------------------
  // Search / filter
  // -------------------------

  const filteredCalendarItems: CalendarItem[] =
    calendarItems.filter(
      (item: CalendarItem): boolean => {
        const q = searchQuery.toLowerCase();

        const matchesSearch =
          (item.title ?? "")
            .toLowerCase()
            .includes(q) ||
          (item.notes ?? "")
            .toLowerCase()
            .includes(q) ||
          (item.category ?? "")
            .toLowerCase()
            .includes(q);

        const matchesCategory =
          categoryFilter === "" ||
          (item.category ?? "").trim() ===
            categoryFilter;

        const matchesType =
          typeFilter === "" ||
          (item.type ?? "").trim() ===
            typeFilter;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesType
        );
      }
    );

  // -------------------------
  // Pagination
  // -------------------------

  const totalPages: number = Math.ceil(
    filteredCalendarItems.length /
      calendarItemsPerPage
  );

  const displayedCalendarItems: CalendarItem[] =
    filteredCalendarItems.slice(
      calendarItemPage *
        calendarItemsPerPage,

      (calendarItemPage + 1) *
        calendarItemsPerPage
    );

  useEffect(() => {
    setCalendarItemPage(0);
  }, [
    searchQuery,
    categoryFilter,
    typeFilter,
  ]);

  // -------------------------
  // Items for selected day
  // -------------------------

  const selectedDayItems: CalendarItem[] =
    getCalendarItemsForDay(
      calendarItems,
      selectedDay,
      month,
      year
    );

  // -------------------------
  // Days that contain items
  // -------------------------

  const calendarDaysWithItems =
    getCalendarDaysWithItems(
      calendarItems,
      month,
      year
    );

  // -------------------------
  // Sign out
  // -------------------------

  function handleSignOut(): void {
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
        onCreateEvent={() =>
          navigate("/event")
        }
        onCreateTask={() =>
          navigate("/task")
        }
        onCreateAppointment={() =>
          navigate("/appointment")
        }
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
                View your schedule and upcoming
                events, tasks, and appointments
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
                  ).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
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
                    view === "month"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setView("month")
                  }
                >
                  Month
                </button>

                <button
                  className={`cal-view-button ${
                    view === "day"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setView("day")
                  }
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
                  calendarItems={
                    displayedCalendarItems
                  }
                  onSelectDay={
                    handleSelectDay
                  }
                />
              )}

              {view === "day" && (
                <DayView
                  calendarItems={
                    selectedDayItems
                  }
                />
              )}

            </div>
          </div>

          {/* Mini calendar */}
          <MiniCalendar
            month={month}
            year={year}
            selectedDay={selectedDay}
            calendarDaysWithItems={
              calendarDaysWithItems
            }
            onPrevMonth={
              handlePrevMonth
            }
            onNextMonth={
              handleNextMonth
            }
            onSelectDay={(day: number) =>
              setSelectedDay(day)
            }
          />

        </div>

        {/* Items section */}
        <div className="cal-section-header">

          <div className="cal-section-title">

            <span className="material-symbols-outlined">
              event
            </span>

            <div>

              <h2>
                Events, Tasks and Appointments
              </h2>

              <p>
                View, filter, search, edit and
                manage your scheduled items
              </p>

            </div>

          </div>
        </div>

        {/* Filters */}
        <CalendarFilters
          categoryFilter={
            categoryFilter
          }
          setCategoryFilter={
            setCategoryFilter
          }
          typeFilter={typeFilter}
          setTypeFilter={
            setTypeFilter
          }
        />

        {/* Item cards */}
        <CalendarItemList
          calendarItems={
            displayedCalendarItems
          }
          navigate={navigate}
        />

        {/* Pagination */}
        <div className="calendaritem-pagination">

          <button
            onClick={() =>
              setCalendarItemPage(
                calendarItemPage - 1
              )
            }
            disabled={
              calendarItemPage === 0
            }
          >
            Previous
          </button>

          <span>
            Page {calendarItemPage + 1} of{" "}
            {totalPages || 1}
          </span>

          <button
            onClick={() =>
              setCalendarItemPage(
                calendarItemPage + 1
              )
            }
            disabled={
              calendarItemPage >=
              totalPages - 1
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

