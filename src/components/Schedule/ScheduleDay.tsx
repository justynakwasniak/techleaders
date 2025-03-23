import { format, fromUnixTime } from "date-fns";
import { CalendarEvent } from ".";
import ScheduleEvent from "./ScheduleEvent";

type ScheduleDayProps = {
    date: Date;
    events: CalendarEvent[];
    onEventClick: (event: CalendarEvent) => void;
    onEmptyDateClick: (date: Date) => void;
  };
  
  const ScheduleDay = ({ date, events, onEventClick, onEmptyDateClick }: ScheduleDayProps) => {
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
              onClick={() => onEmptyDateClick(new Date(date.setHours(hour, 0, 0, 0)))}
            >
              {hour}:00
            </div>
          ))}
        </div>
        {dayEvents.map((event) => (
          <ScheduleEvent key={event.title} event={event} onEventClick={onEventClick} />
        ))}
      </div>
    );
  };
  
  export default ScheduleDay;