const HOUR_HEIGHT = 48;
const HEADER_HEIGHT = 40;
const DAY_START_HOUR = 8;

export const calculateEventPosition = (dateStart: number, dateEnd: number) => {
    const eventStartDate = new Date(dateStart * 1000);
    const eventStartHour = eventStartDate.getHours();
    const eventStartMinutes = eventStartDate.getMinutes();
  
    const eventEndDate = new Date(dateEnd * 1000);
    const eventEndHour = eventEndDate.getHours();
    const eventEndMinutes = eventEndDate.getMinutes();
  
    const eventDurationInHours =
      eventEndHour - eventStartHour + (eventEndMinutes - eventStartMinutes) / 60;
    const eventHeight = eventDurationInHours * HOUR_HEIGHT;
  
    const topOffsetInHours =
      eventStartHour - DAY_START_HOUR + eventStartMinutes / 60;
    const topOffset = topOffsetInHours * HOUR_HEIGHT;
  
    return {
      top: HEADER_HEIGHT + topOffset,
      height: eventHeight,
    };
  };

