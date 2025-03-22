import { useState } from "react";
import { addDays, format } from "date-fns";
import { CalendarEvent } from ".";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleDay from "./ScheduleDay";
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
      const date = addDays(start, i);
      return { date };
    });
  };

  const weekDates = generateWeekDates(startDate);

  const changeWeek = (days: number) => {
    setStartDate((prev) => addDays(prev, days));
  };

  const handleHourClick = (date: Date, hour: number) => {
    const clickedDate = new Date(date);
    clickedDate.setHours(hour, 0, 0, 0);
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
        <ScheduleHeader startDate={startDate} changeWeek={changeWeek} />
        <div className="flex gap-4 p-4 overflow-x-auto">
          {weekDates.map(({ date }) => (
            <ScheduleDay
              key={format(date, "yyyy-MM-dd")}
              date={date}
              events={events}
              handleHourClick={handleHourClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
