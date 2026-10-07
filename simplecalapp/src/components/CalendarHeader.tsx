function CalendarHeader({
  searchQuery,
  setSearchQuery,
  onCreateEvent,
  onCreateTask,
  onCreateAppointment,
  onSignOut,
}) {
  return (
    <div className="cal-header">

      <span className="material-symbols-outlined">
        calendar_month
      </span>

      <p className="cal-title">
        SimpleCal
      </p>

      <input
        className="cal-calendaritems-search-input"
        type="search"
        placeholder="Search events, tasks or appointments..."
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(e.target.value)
        }
      />

      <button
        className="cal-events-btn"
        onClick={onCreateEvent}
      >
        Create Events
      </button>

      <button
        className="cal-tasks-btn"
        onClick={onCreateTask}
      >
        Create Tasks
      </button>

      <button
        className="cal-appointments-btn"
        onClick={onCreateAppointment}
      >
        Create Appointments
      </button>

      <button
        className="cal-signout-btn"
        onClick={onSignOut}
      >
        Sign Out
      </button>

    </div>
  );
}

export default CalendarHeader;