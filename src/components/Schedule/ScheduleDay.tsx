import { format, fromUnixTime } from "date-fns";
import { CalendarEvent } from ".";
import ScheduleEvent from "./ScheduleEvent";

type ScheduleDayProps = {
  date: Date;
  events: CalendarEvent[];
  handleHourClick: (date: Date, hour: number) => void;
};

const ScheduleDay = ({ date, events, handleHourClick }: ScheduleDayProps) => {
  const dayEvents = events.filter((event) => {
    const eventDate = fromUnixTime(event.dateStart);
    return format(eventDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
  });

  return (
    <div key={format(date, "yyyy-MM-dd")} className="w-32 bg-gray-100 relative pt-[40px]">
      <h3 className="text-center font-bold absolute top-0 left-0 w-full p-2">
        {format(date, "dd/MM/yyyy")}
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
      {dayEvents.map((event) => (
        <ScheduleEvent key={event.title} event={event} />
      ))}
    </div>
  );
};

export default ScheduleDay;
