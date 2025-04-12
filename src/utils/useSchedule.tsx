
import { useState, useEffect } from "react";
import { CalendarEvent } from "../components/Schedule";

export const useSchedule = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setTimeout(async () => {
          const response = await fetch("/events.json");
          const data = await response.json();
          setEvents(data); 
          setLoading(false); 
        }, 500);
      } catch (err) {
        setError("Error fetching events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

  return { events, loading, error, handleEventClick, handleEmptyDateClick };
};
