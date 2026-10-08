import { formatTime,
      type CalendarItem, 
 } from "./calendarUtils";


interface DayViewProps {
  calendarItems: CalendarItem[];
}

function DayView({ calendarItems }: DayViewProps) {
  const calendarHours: number[] = Array.from(
    { length: 24 },
    (_, index) => index
  );

  return (
    <div className="day-view">

      {/* Time column */}
      <div className="cal-time-column">

        {calendarHours.map((hour) => {
          const displayHour = hour % 12 || 12;

          const period = hour >= 12 ? "PM" : "AM";

          return (
            <div key={hour}>
              {displayHour}:00 {period}
            </div>
          );
        })}

      </div>

      {/* Schedule */}
      <div className="cal-schedule-column">

        {calendarHours.map((hour) => {
          const itemsForThisHour: CalendarItem[] =
            calendarItems.filter((item) => {

              if (!item.time) {
                return false;
              }

              const itemHour = parseInt(
                item.time.split(":")[0],
                10
              );

              return itemHour === hour;
            });

          return (
            <div
              className="cal-time-slot"
              key={hour}
            >

              {itemsForThisHour.map((calendarItem) => (
                <div
                  key={calendarItem._id}
                  className={`cal-calendar-calendaritem ${
                    (calendarItem.category || "other").toLowerCase()
                  } ${
                    (calendarItem.type || "other").toLowerCase()
                  }`}
                >

                  <strong>
                    {calendarItem.title}
                  </strong>

                  <span>
                    {formatTime(calendarItem.time)}
                  </span>

                  <span>
                    {calendarItem.type}
                  </span>

                  <span className="cal-calendaritem-category-small">
                    {calendarItem.category}
                  </span>

                </div>
              ))}

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default DayView;

