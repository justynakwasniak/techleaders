import { useState } from "react";
import { addDays, format } from "date-fns";
import { CalendarEvent } from ".";
import ScheduleHeader from "./components/ScheduleHeader";
import ScheduleDay from "./components/ScheduleDay";
import { startOfWeek } from "date-fns";


type ScheduleProps = {
  events: CalendarEvent[]; // Array of events to display
  onEventClick: (event: CalendarEvent) => void; // Callback when an event is clicked
  onEmptyDateClick: (date: Date) => void; // Callback when an empty date is clicked
};

const Schedule = ({ events, onEventClick, onEmptyDateClick }: ScheduleProps) => { // State to manage the start date of the week
 const [startDate, setStartDate] = useState(() => // Initialize startDate to the start of the current week (Monday)
  startOfWeek(new Date(), { weekStartsOn: 1 }) // 1 means the week starts on Monday
);

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
