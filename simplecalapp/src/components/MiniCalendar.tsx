const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const daysOfWeek: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

interface MiniCalendarProps { 
    month: number; 
    year: number; 
    selectedDay: number; 
    calendarDaysWithItems: number[]; 
    onPrevMonth: () => void; 
    onNextMonth: () => void; 
    onSelectDay: (day: number) => void; 
  }


function MiniCalendar({
  month,
  year,
  selectedDay,
  calendarDaysWithItems,
  onPrevMonth,
  onNextMonth,
  onSelectDay,
}: MiniCalendarProps) {

  const today: Date = new Date();

  const firstDay: number= new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth: number = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const days: (number | null)[] = [];

  // Empty spaces before first day
  for (
    let i = 0;
    i < firstDay;
    i++
  ) {
    days.push(null);
  }

  // Days of month
  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    days.push(day);
  }

  return (
    <div className="cal-minicalander">

      <h2 className="cal-monthinyear">
        {months[month]} / {year}
      </h2>

      <div className="cal-filter">

        <button
          className="cal-left"
          onClick={onPrevMonth}
        >
          &lt;
        </button>

        <button
          className="cal-right"
          onClick={onNextMonth}
        >
          &gt;
        </button>

      </div>

      <div className="cal-grid">

        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="cal-daysofweek"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => {

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          const hasCalendarItem =
            day !== null &&
            calendarDaysWithItems.includes(day);

          const isSelected =
            day === selectedDay;

          return (
            <div
              key={index}
              className={`cal-days ${isToday
                ? "cal-today"
                : ""
                } ${isSelected
                  ? "selected"
                  : ""
                }`}
              onClick={() => {

                if (day !== null) {
                  onSelectDay(day);
                }

              }}
            >

              {day ?? ""}

              {hasCalendarItem && (
                <span className="cal-calendaritem-dot">
                </span>
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default MiniCalendar;