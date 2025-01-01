import "./CalendarView.css";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

interface Communication {
  id: number;
  date: string;
  method: string;
  type: "past" | "upcoming";
}

const CalendarView: React.FC = () => {
  const [communications, setCommunications] = useState<Communication[]>([
    { id: 1, date: "2023-01-01", method: "Email", type: "past" },
    { id: 2, date: "2023-01-15", method: "Phone Call", type: "past" },
    { id: 3, date: "2023-04-10", method: "Conference", type: "upcoming" },
    { id: 4, date: "2023-04-15", method: "Follow-up Call", type: "upcoming" },
    { id: 5, date: "2023-05-20", method: "Presentation", type: "upcoming" },
  ]);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [view, setView] = useState<"past" | "upcoming">("past");

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
  };

  const handleViewChange = (viewType: "past" | "upcoming") => {
    setView(viewType);
    setSelectedDate(null); // Reset the selected date when switching views
  };

  const pastCommunications = communications.filter((comm) => comm.type === "past");
  const upcomingCommunications = communications.filter((comm) => comm.type === "upcoming");
  const selectedDateUpcomingCommunications = selectedDate
    ? communications.filter(
        (comm) => comm.date === selectedDate && comm.type === "upcoming"
      )
    : [];

  return (
    <div className="calendar-container">
      <div className="left-section">
        <h2 className="calendar-heading">Calendar View</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={communications.map((comm) => ({
            id: comm.id.toString(),
            title: comm.method,
            date: comm.date,
          }))}
          height="auto"
        />
      </div>

      <div className="right-section">
        <div className="buttons">
          <button
            className={view === "past" ? "active" : ""}
            onClick={() => handleViewChange("past")}
          >
            Past Communications
          </button>
          <button
            className={view === "upcoming" ? "active" : ""}
            onClick={() => handleViewChange("upcoming")}
          >
            Upcoming Communications
          </button>
        </div>

        <h3>
          {selectedDate
            ? `Communications on ${selectedDate}`
            : view === "past"
            ? "Past Communications"
            : "Upcoming Communications"}
        </h3>

        <div className="communications-list">
          {view === "past"
            ? pastCommunications.map((comm) => (
                <div key={comm.id} className="communication-card past">
                  <h4>{comm.method}</h4>
                  <p>{comm.date}</p>
                </div>
              ))
            : selectedDate
            ? selectedDateUpcomingCommunications.map((comm) => (
                <div key={comm.id} className="communication-card upcoming">
                  <h4>{comm.method}</h4>
                  <p>{comm.date}</p>
                </div>
              ))
            : upcomingCommunications.map((comm) => (
                <div key={comm.id} className="communication-card upcoming">
                  <h4>{comm.method}</h4>
                  <p>{comm.date}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
