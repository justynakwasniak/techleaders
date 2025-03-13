import { CalendarEvent, WeekDate } from "../../types"; 
import {formatTime} from "../../utils/utils";


const calendarData: CalendarEvent[] = [
  { dateStart: 1740985200, dateEnd: 1740996000, title: "Meeting 1" },
  { dateStart: 1741082400, dateEnd: 1741086000, title: "Meeting 2" },
  { dateStart: 1741348800, dateEnd: 1741356000, title: "Meeting 3" },
  { dateStart: 1741539600, dateEnd: 1741550400, title: "Meeting 4" },
];

const weekDates: WeekDate[] = Array.from({ length: 7 }, (_, i) => ({
  day: 3 + i,
  month: 3,
  year: 2025,
}));

const hourHeight = 48;
const headerHeight = 40;


const calculateEventPosition = (
  dateStart: number,
  dateEnd: number,
  hourHeight: number,
  headerHeight: number
) => {
  const eventStartDate = new Date(dateStart * 1000);
  const eventStartHour = eventStartDate.getHours();
  const eventStartMinutes = eventStartDate.getMinutes();

  const eventEndDate = new Date(dateEnd * 1000);
  const eventEndHour = eventEndDate.getHours();
  const eventEndMinutes = eventEndDate.getMinutes();


  const eventDurationInHours =
    (eventEndHour - eventStartHour) + (eventEndMinutes - eventStartMinutes) / 60;
  const eventHeight = eventDurationInHours * hourHeight;

  
  const topOffsetInHours = (eventStartHour - 8) + (eventStartMinutes / 60);
  const topOffset = topOffsetInHours * hourHeight;

  return {
    top: headerHeight + topOffset,
    height: eventHeight,
  };
};
const Schedule = () => {
  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {weekDates.map((date) => {
        const dayEvents = calendarData.filter((event) => {
          const eventDate = new Date(event.dateStart * 1000);
          return (
            eventDate.getDate() === date.day &&
            eventDate.getMonth() === date.month - 1 &&
            eventDate.getFullYear() === date.year
          );
        });

        return (
          <div key={date.day} className="w-32 bg-gray-100 relative" style={{ paddingTop: `${headerHeight}px` }}> 
            <h3 className="text-center font-bold absolute top-0 left-0 w-full p-2">
              {`${date.day}/${date.month}/${date.year}`}
            </h3>
            <div className="relative">
              {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                <div key={hour} className="h-12 border-t border-gray-300 text-sm text-center">
                  {hour}:00
                </div>
              ))}
            </div>
            {dayEvents.map((event) => {
              const { top, height } = calculateEventPosition(
                event.dateStart,
                event.dateEnd,
                hourHeight,
                headerHeight
              );

              return (
                <div
                  key={event.title}
                  className="absolute left-0 right-0 bg-blue-500 text-white text-center text-xs p-1 overflow-hidden"
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
  );
};

export default Schedule;
