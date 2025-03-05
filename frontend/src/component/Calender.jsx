import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const events = [
    { title: "Assignment 4 Last Date", start: "2024-03-26" },
    { title: "Maha Shivratri", start: "2024-03-26", color: "green" },
    { title: "Holi", start: "2024-03-14", color: "blue" },
    { title: "Ramadan Start", start: "2024-03-02", color: "blue" },
    { title: "Eid-ul-Fitr", start: "2025-03-31", color: "blue" },
    {title:"NPTL Week 6", start:"2025-03-05" , color:"red"},
    {title:"NPTL Week 6", start:"2025-03-05" , color:"red"}
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">March 2025</h2>

      {/* Mobile View - Adjust spacing for tasks */}
      {isMobile ? (
        <div className="grid grid-cols-7 gap-1 text-center text-sm w-full">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} className="font-bold text-gray-600">{d}</div>
          ))}

          {Array.from({ length: 31 }, (_, i) => {
            const date = `2025-03-${String(i + 1).padStart(2, "0")}`;
            const event = events.find((e) => e.start === date);
            return (
              <div
                key={i}
                className="h-25 flex flex-col items-center justify-center rounded-md relative bg-gray-100 w-full"
              >
                <span className="text-sm font-semibold">{i + 1}</span>
                {event && (
                 <span className="text-[8px] bg-blue-500 text-white px-2 py-1 rounded mt-1 w-full text-center">
                     {event.title}
                 </span>               
                )}
              </div>
            );
          })}
        </div>
      ) : (
        // Desktop View - Google Calendar style
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
          aspectRatio={1.5}
        />
      )}
    </div>
  );
};

export default Calendar;
