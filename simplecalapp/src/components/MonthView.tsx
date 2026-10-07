import {
  getCalendarDays,
  formatTime,
} from "./calendarUtils";

function MonthView({
  month,
  year,
  calendarItems,
  onSelectDay,
}) {
  const days = getCalendarDays(year, month);

  return (
    <div className="month-view">

      {/* Days of week */}
      <div className="month-weekdays">
        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].map((day) => (
          <div
            className="month-weekday"
            key={day}
          >
            {day}
          </div>
        ))}

      </div>

      {/* Calendar grid */}
      <div className="month-grid">

        {days.map((day, index) => {

          const dayItems = calendarItems
            .filter((item) => {
              if (!item.date) return false;

              return (
                item.date.split("T")[0] ===
                day.date
              );
            })
            .sort((a, b) => {

              if (!a.time) return 1;
              if (!b.time) return -1;

              return String(a.time).localeCompare(
                String(b.time)
              );
            });

          return (
            <div
              key={index}
              className={`month-day ${
                day.isCurrentMonth
                  ? ""
                  : "other-month"
              } ${
                day.isToday
                  ? "today"
                  : ""
              }`}
              onClick={() =>
                onSelectDay(day)
              }
            >

              <div className="month-day-number">
                {day.day}
              </div>

              <div className="month-day-items">

                {dayItems.map((item) => (
                  <div
                    key={item._id}
                    className={`month-calendar-item ${
                      (
                        item.type ||
                        "event"
                      ).toLowerCase()
                    }`}
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                  >

                    <strong>
                      {item.title}
                    </strong>

                    {item.time && (
                      <span>
                        {formatTime(item.time)}
                      </span>
                    )}

                  </div>
                ))}

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default MonthView;