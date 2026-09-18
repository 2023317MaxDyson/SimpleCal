export function formatDate(date) {
  const y = date.getFullYear();

  const m = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const d = String(
    date.getDate()
  ).padStart(2, "0");

  return `${y}-${m}-${d}`;
}


// -------------------------
// Check if date is today
// -------------------------

export function isToday(date) {
  const today = new Date();

  return (
    date.getFullYear() ===
      today.getFullYear() &&
    date.getMonth() ===
      today.getMonth() &&
    date.getDate() ===
      today.getDate()
  );
}


// -------------------------
// Generate month calendar
// -------------------------

export function getCalendarDays(
  year,
  month
) {
  const firstDay = new Date(
    year,
    month,
    1
  );

  const lastDay = new Date(
    year,
    month + 1,
    0
  );

  const daysInMonth =
    lastDay.getDate();

  const startingDay =
    firstDay.getDay();

  const days = [];

  // Previous month
  const previousMonthLastDay =
    new Date(
      year,
      month,
      0
    ).getDate();

  for (
    let i = startingDay - 1;
    i >= 0;
    i--
  ) {
    const date = new Date(
      year,
      month - 1,
      previousMonthLastDay - i
    );

    days.push({
      day: date.getDate(),
      date: formatDate(date),
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // Current month
  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    const date = new Date(
      year,
      month,
      day
    );

    days.push({
      day,
      date: formatDate(date),
      isCurrentMonth: true,
      isToday: isToday(date),
    });
  }

  // Next month
  let nextDay = 1;

  while (days.length < 42) {
    const date = new Date(
      year,
      month + 1,
      nextDay
    );

    days.push({
      day: nextDay,
      date: formatDate(date),
      isCurrentMonth: false,
      isToday: false,
    });

    nextDay++;
  }

  return days;
}


// -------------------------
// Get items for a day
// -------------------------

export function getCalendarItemsForDay(
  calendarItems,
  day,
  month,
  year
) {
  return calendarItems.filter(
    (calendarItem) => {

      if (!calendarItem.date) {
        return false;
      }

      const calendarDate =
        calendarItem.date.split("T")[0];

      const [
        calendarYear,
        calendarMonth,
        calendarDay,
      ] = calendarDate
        .split("-")
        .map(Number);

      return (
        calendarYear === year &&
        calendarMonth - 1 === month &&
        calendarDay === day
      );
    }
  );
}


// -------------------------
// Get days containing items
// -------------------------

export function getCalendarDaysWithItems(
  calendarItems,
  month,
  year
) {
  return calendarItems
    .filter((item) => {

      if (!item.date) {
        return false;
      }

      const [
        calendarYear,
        calendarMonth,
      ] = item.date
        .split("T")[0]
        .split("-")
        .map(Number);

      return (
        calendarYear === year &&
        calendarMonth - 1 === month
      );
    })
    .map((item) => {

      const [, , day] =
        item.date
          .split("T")[0]
          .split("-")
          .map(Number);

      return day;
    });
}


// -------------------------
// Format time
// -------------------------

export function formatTime(time) {
  if (!time) {
    return "";
  }

  const [hours, minutes] =
    time.split(":");

  const hour = Number(hours);

  const period =
    hour >= 12 ? "PM" : "AM";

  const displayHour =
    hour % 12 || 12;

  return `${displayHour}:${minutes} ${period}`;
}