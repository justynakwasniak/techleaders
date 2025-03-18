import { useState } from "react";
import { CalendarEvent, WeekDate } from ".";
import { formatTime } from "../../utils/formatTime";
import { calculateEventPosition } from "../../utils/calculateEventPosition";
import { roundToNearestHalfHour } from "../../utils/roundToNearestHalfHour";

const calendarData: CalendarEvent[] = [
  { dateStart: 1740985200, dateEnd: 1740996000, title: "Meeting 1" },
  { dateStart: 1741082400, dateEnd: 1741086000, title: "Meeting 2" },
  { dateStart: 1741348800, dateEnd: 1741356000, title: "Meeting 3" },
  { dateStart: 1741539600, dateEnd: 1741550400, title: "Meeting 4" },
];

const Schedule = () => {
  const [startDate, setStartDate] = useState(new Date(2025, 2, 3)); 
  const [events, setEvents] = useState<CalendarEvent[]>(calendarData);
 
  const generateWeekDates = (start: Date) => { 
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    });
  };

  const weekDates = generateWeekDates(startDate); 

  const changeWeek = (days: number) => { 
    setStartDate((prev) => {
      const newDate = new Date(prev); 
      newDate.setDate(prev.getDate() + days);
      return newDate;
    });
  };

  const handleHourClick = (date: WeekDate, hour: number) => { 
    const clickedDate = new Date(date.year, date.month - 1, date.day, hour);
    const roundedDate = roundToNearestHalfHour(clickedDate);  
    const newEvent: CalendarEvent = {
      dateStart: Math.floor(roundedDate.getTime() / 1000),
      dateEnd: Math.floor(roundedDate.getTime() / 1000) + 3600,
      title: `New Event`,
    };
    setEvents((prev) => [...prev, newEvent]);
  };


  return (
    <div className="flex justify-center items-center p-4">
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => changeWeek(-7)} className="p-2 ">⬅</button>
          <h2 className="text-lg font-bold">{`${weekDates[0].day}/${weekDates[0].month} - ${weekDates[6].day}/${weekDates[6].month}`}</h2>
          <button onClick={() => changeWeek(7)} className="p-2">➡</button>
        </div>
        <div className="flex gap-4 p-4 overflow-x-auto">
          {weekDates.map((date) => {
            const dayEvents = events.filter((event) => {
              const eventDate = new Date(event.dateStart * 1000);
              return (
                eventDate.getDate() === date.day &&
                eventDate.getMonth() + 1 === date.month &&
                eventDate.getFullYear() === date.year
              );
            });

            return (
              <div
                key={date.day}
                className="w-32 bg-gray-100 relative pt-[40px]"
              >
                <h3 className="text-center font-bold absolute top-0 left-0 w-full p-2">
                  {`${date.day}/${date.month}/${date.year}`}
                </h3>
                <div className="relative">
                  {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                    <div
                      key={hour}
                      className="h-12 border-t border-gray-300 text-sm text-center cursor-pointer"
                      onClick={() => handleHourClick(date, hour)}
                    >
                      {hour}:00
                    </div>
                  ))}
                </div>
                {dayEvents.map((event) => {
                  const { top, height } = calculateEventPosition(event.dateStart, event.dateEnd);
                  return (
                    <div
                      key={event.title}
                      className="absolute left-0 right-0 bg-blue-500 text-white text-center text-xs p-1 overflow-hidden cursor-pointer hover:bg-blue-700"
                      style={{ top: `${top}px`, height: `${height}px` }}
                    >
                      {event.title} <br />
                      {formatTime(event.dateStart)} - {formatTime(event.dateEnd)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
