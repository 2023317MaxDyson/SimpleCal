import { type ChangeEvent } from "react";

interface CalendarHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onCreateEvent: () => void;
  onCreateTask: () => void;
  onCreateAppointment: () => void;
  onSignOut: () => void;
}

function CalendarHeader({
  searchQuery,
  setSearchQuery,
  onCreateEvent,
  onCreateTask,
  onCreateAppointment,
  onSignOut,
}: CalendarHeaderProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
        onChange={handleSearchChange}
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

