import { formatTime } from "./calendarUtils";
import type { NavigateFunction } from "react-router-dom";

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

interface CalendarItemListProps {
  calendarItems: CalendarItem[];
  navigate: NavigateFunction;
}

function CalendarItemList({
  calendarItems,
  navigate,
}: CalendarItemListProps) {
  return (
    <div className="cal-container">
      <div className="cal-show-calendaritems">
        {calendarItems.length > 0 ? (
          calendarItems.map((calendarItem) => (
            <div
              key={calendarItem._id}
              className={`cal-calenderitem ${
                (calendarItem.type || "other").toLowerCase()
              }`}
              onClick={() =>
                navigate("/edit", {
                  state: {
                    item: calendarItem,
                    type: calendarItem.type,
                  },
                })
              }
            >
              <h3 className="cal-calendaritem-title">
                {calendarItem.title}
              </h3>

              <p className="cal-calendaritem-date">
                {calendarItem.date
                  ? calendarItem.date.split("T")[0]
                  : ""}
              </p>

              {calendarItem.image && (
                <img
                  className="cal-calendaritem-image"
                  src={calendarItem.image}
                  alt={calendarItem.title}
                />
              )}

              <p className="cal-calendaritem-time">
                {formatTime(calendarItem.time)}
              </p>

              <p className="cal-calendaritem-notes">
                {calendarItem.notes}
              </p>

              <div className="cal-calanderitem-options">
                <p className="cal-calendaritem-type">
                  {calendarItem.type}
                </p>

                <p className="cal-calendaritem-category">
                  {calendarItem.category}
                </p>
              </div>

              <br />

              <button
                className="cal-edit-btn"
                onClick={(e) => {
                  e.stopPropagation();

                  navigate("/edit", {
                    state: {
                      item: calendarItem,
                      type: calendarItem.type,
                    },
                  });
                }}
              >
                Edit
              </button>
            </div>
          ))
        ) : (
          <p>No calendar items found</p>
        )}
      </div>
    </div>
  );
}

export default CalendarItemList;

