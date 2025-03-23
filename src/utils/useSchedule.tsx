import { useState } from "react";
import { CalendarEvent } from "../components/Schedule";

export const useSchedule = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    { dateStart: 1740985200, dateEnd: 1740996000, title: "Meeting 1" },
    { dateStart: 1741082400, dateEnd: 1741086000, title: "Meeting 2" },
    { dateStart: 1741348800, dateEnd: 1741356000, title: "Meeting 3" },
    { dateStart: 1741539600, dateEnd: 1741550400, title: "Meeting 4" },
  ]);

  const handleEventClick = (event: CalendarEvent) => {
    alert(`This hour is occupied by:  ${event.title}`);
  };

  const handleEmptyDateClick = (date: Date) => {
    const newEvent: CalendarEvent = {
      dateStart: Math.floor(date.getTime() / 1000),
      dateEnd: Math.floor(date.getTime() / 1000) + 3600,
      title: `New event`,
    };

    setEvents((prev) => [...prev, newEvent]);
  };

  return { events, handleEventClick, handleEmptyDateClick };
};
