interface CalendarFiltersProps 
{ categoryFilter: string; 
  setCategoryFilter: React.Dispatch< React.SetStateAction<string>>; 
  typeFilter: string; 
  setTypeFilter: React.Dispatch< React.SetStateAction<string>>; 
}

function CalendarFilters({
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
}: CalendarFiltersProps) {


  return (
    <div className="cal-filter-category">

      <select
        className="cal-category-select"
        value={categoryFilter}
        onChange={(e) =>
          setCategoryFilter(e.target.value)
        }
      >
        <option value="">
          Category
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

      <select
        className="cal-category-select"
        value={typeFilter}
        onChange={(e) =>
          setTypeFilter(e.target.value)
        }
      >
        <option value="">
          Calendar Type
        </option>

        <option value="Event">
          Event
        </option>

        <option value="Task">
          Task
        </option>

        <option value="Appointment">
          Appointment
        </option>
      </select>

    </div>
  );
}

export default CalendarFilters;