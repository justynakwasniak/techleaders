import { useState } from "react";
import { addDays, format } from "date-fns";
import { CalendarEvent } from ".";
import ScheduleHeader from "./components/ScheduleHeader";
import ScheduleDay from "./components/ScheduleDay";

type ScheduleProps = {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onEmptyDateClick: (date: Date) => void;
};

const Schedule = ({ events, onEventClick, onEmptyDateClick }: ScheduleProps) => {
  const [startDate, setStartDate] = useState(new Date(2025, 2, 3));

  const generateWeekDates = (start: Date) => {
    return Array.from({ length: 7 }, (_, i) => {
      return { date: addDays(start, i) };
    });
  };

  const weekDates = generateWeekDates(startDate);

  const changeWeek = (days: number) => {
    setStartDate((prev) => addDays(prev, days));
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
              onEventClick={onEventClick}
              onEmptyDateClick={onEmptyDateClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
