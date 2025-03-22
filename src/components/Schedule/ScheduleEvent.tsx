import { formatTime } from "../../utils/formatTime";
import { calculateEventPosition } from "../../utils/calculateEventPosition";
import { CalendarEvent } from ".";

type ScheduleEventProps = {
  event: CalendarEvent;
};

const ScheduleEvent = ({ event }: ScheduleEventProps) => {
  const { top, height } = calculateEventPosition(event.dateStart, event.dateEnd);

  return (
    <div
      className="absolute left-0 right-0 bg-blue-500 text-white text-center text-xs p-1 overflow-hidden cursor-pointer hover:bg-blue-700"
      style={{ top: `${top}px`, height: `${height}px` }}
    >
      {event.title} <br />
      {formatTime(event.dateStart)} - {formatTime(event.dateEnd)}
    </div>
  );
};

export default ScheduleEvent;
