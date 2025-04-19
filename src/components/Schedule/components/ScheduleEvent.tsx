import { formatTime } from "../../../utils/formatTime";
import { calculateEventPosition } from "../../../utils/calculateEventPosition";
import { CalendarEvent } from "../index";
type ScheduleEventProps = {
    event: CalendarEvent;
    onEventClick: (event: CalendarEvent) => void;
  };
  
  const ScheduleEvent = ({ event, onEventClick }: ScheduleEventProps) => {
    const { top, height } = calculateEventPosition(event.dateStart, event.dateEnd);
  
    return (
      <div
        className="absolute left-0 right-0 bg-blue-500 text-white text-center text-xs p-1 overflow-hidden cursor-pointer hover:bg-blue-700"
        style={{ top: `${top}px`, height: `${height}px` }}
        onClick={() => onEventClick(event)}
      >
        {event.title} <br />
        {formatTime(event.dateStart)} - {formatTime(event.dateEnd)}
      </div>
    );
  };
  
  export default ScheduleEvent;