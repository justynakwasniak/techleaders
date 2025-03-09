import { CalendarEvent, WeekDate } from "types"; 

const calendarData: CalendarEvent[] = [ // lista wydarzeń
  { dateStart: 1740985200, dateEnd: 1740996000, title: "Meeting 1" },
  { dateStart: 1741082400, dateEnd: 1741086000, title: "Meeting 2" },
  { dateStart: 1741348800, dateEnd: 1741356000, title: "Meeting 3" },
  { dateStart: 1741539600, dateEnd: 1741550400, title: "Meeting 4" },
];

const weekDates: WeekDate[] = Array.from({ length: 7 }, (_, i) => ({ // lista dni tygodnia
  day: 3 + i,
  month: 3,
  year: 2025,
}));

const Schedule = () => { // komponent kalendarza
  const hourHeight = 48;
  const headerHeight = 40;

  // Funkcja formatująca czas
  const formatTime = (timestamp: number): string => { // formatowanie czasu
    const date = new Date(timestamp * 1000);// konwersja czasu
    let hours = date.getHours().toString();// konwersja godzin
    let minutes = date.getMinutes().toString();// konwersja minut

    if (hours.length < 2) hours = '0' + hours;// dodanie zera przed godziną
    if (minutes.length < 2) minutes = '0' + minutes;// dodanie zera przed minutą

    return `${hours}:${minutes}`;// zwrócenie sformatowanego czasu
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {weekDates.map((date) => {// mapowanie dni tygodnia/
        // Filtrowanie wydarzeń na dany dzień
        const dayEvents = calendarData.filter((event) => {// filtrowanie wydarzeń na dany dzień
          const eventDate = new Date(event.dateStart * 1000);// konwersja czasu
          return (
            eventDate.getDate() === date.day &&// sprawdzenie czy wydarzenie jest w danym dniu
            eventDate.getMonth() === date.month - 1 &&    // sprawdzenie czy wydarzenie jest w danym miesiącu
            eventDate.getFullYear() === date.year// sprawdzenie czy wydarzenie jest w danym roku
          );
        });

        return (
          <div key={date.day} className="w-32 bg-gray-100 relative" style={{ paddingTop: `${headerHeight}px` }}> 
            <h3 className="text-center font-bold absolute top-0 left-0 w-full p-2">{`${date.day}/${date.month}/${date.year}`}</h3>
            <div className="relative">
              {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (// mapowanie godzin w dniu o 8 do 20
                <div
                  key={hour}
                  className="h-12 border-t border-gray-300 text-sm text-center"
                >
                  {hour}:00
                </div>
              ))}
            </div>
            {dayEvents.map((event) => {// mapowanie wydarzeń
              const eventStartDate = new Date(event.dateStart * 1000);// konwersja czasu
              const eventStartHour = eventStartDate.getHours(); // konwersja godzin
              const eventStartMinutes = eventStartDate.getMinutes();// konwersja minut

              const eventEndDate = new Date(event.dateEnd * 1000);
              const eventEndHour = eventEndDate.getHours();
              const eventEndMinutes = eventEndDate.getMinutes();

              // Obliczenia
              const eventDurationInHours = (eventEndHour - eventStartHour) + (eventEndMinutes - eventStartMinutes) / 60; // obliczenie długości wydarzenia
              const eventHeight = eventDurationInHours * hourHeight; // obliczenie wysokości wydarzenia

              const topOffsetInHours = (eventStartHour - 8) + (eventStartMinutes / 60);// obliczenie przesunięcia w godzinach
              const topOffset = topOffsetInHours * hourHeight;// obliczenie przesunięcia w pikselach

              return (
                <div
                  key={event.title}
                  className="absolute left-0 right-0 bg-blue-500 text-white text-center text-xs p-1 overflow-hidden"
                  style={{
                    top: `${headerHeight + topOffset}px`,
                    height: `${eventHeight}px`,
                  }}
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