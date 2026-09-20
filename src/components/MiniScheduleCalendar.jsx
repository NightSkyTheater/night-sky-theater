import React from "react";

const WEEK_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

function getTypeClass(type) {
  switch (type) {
    case "release":
      return "event-release";
    case "finance":
      return "event-finance";
    case "marketing":
      return "event-marketing";
    case "production":
      return "event-production";
    default:
      return "event-default";
  }
}

export default function MiniScheduleCalendar({
  year = 2026,
  month = 9, // 1~12
  today = "2026-09-20",
  events = [],
}) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const todayDate = new Date(today);
  const todayDay =
    todayDate.getFullYear() === year &&
    todayDate.getMonth() === month - 1
      ? todayDate.getDate()
      : null;

  const eventMap = new Map();
  events.forEach((event) => {
    const d = new Date(event.date);
    if (
      d.getFullYear() === year &&
      d.getMonth() === month - 1
    ) {
      eventMap.set(d.getDate(), event);
    }
  });

  const cells = [];

  for (let i = 0; i < firstDay; i += 1) {
    cells.push(
      <div
        key={`blank-${i}`}
        className="mini-cal-cell is-empty"
      />
    );
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const event = eventMap.get(day);
    const cellDate = new Date(year, month - 1, day);
    const weekDay = cellDate.getDay();

    cells.push(
      <div
        key={day}
        className={[
          "mini-cal-cell",
          weekDay === 0 ? "is-sun" : "",
          weekDay === 6 ? "is-sat" : "",
          todayDay === day ? "is-today" : "",
          event ? "has-event" : "",
          event ? getTypeClass(event.type) : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="mini-cal-date">{day}</span>
        {event && <i className="mini-cal-dot" />}
      </div>
    );
  }

  const monthEvents = [...events]
    .filter((event) => {
      const d = new Date(event.date);
      return (
        d.getFullYear() === year &&
        d.getMonth() === month - 1
      );
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className="mini-calendar-card">
      <div className="mini-calendar-left">
        <div className="mini-calendar-header">
          <span className="mini-calendar-pill">
            {MONTH_NAMES[month - 1]}
          </span>
          <small>{year}.{String(month).padStart(2, "0")}</small>
        </div>

        <div className="mini-calendar-weekdays">
          {WEEK_LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="mini-calendar-grid">{cells}</div>

        <div className="mini-calendar-legend">
          <span><i className="legend-dot release" /> 발매</span>
          <span><i className="legend-dot marketing" /> 마케팅</span>
          <span><i className="legend-dot finance" /> 재경</span>
          <span><i className="legend-dot production" /> 제작</span>
        </div>
      </div>

      <div className="mini-calendar-right">
        <div className="mini-calendar-side-head">
          <span className="mini-side-kicker">SCHEDULE</span>
          <h3>주요 일정</h3>
          <p>이번 주 핵심 일정만 빠르게 확인합니다.</p>
        </div>

        <div className="mini-calendar-event-list">
          {monthEvents.length === 0 ? (
            <div className="mini-event-empty">
              등록된 일정이 없습니다.
            </div>
          ) : (
            monthEvents.map((event) => {
              const d = new Date(event.date);
              const day = d.getDate();

              return (
                <div
                  key={`${event.date}-${event.label}`}
                  className={`mini-event-item ${getTypeClass(
                    event.type
                  )}`}
                >
                  <div className="mini-event-date">
                    <strong>{String(day).padStart(2, "0")}</strong>
                    <span>{event.dayLabel || ""}</span>
                  </div>

                  <div className="mini-event-body">
                    <b>{event.label}</b>
                    {event.desc && <p>{event.desc}</p>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}