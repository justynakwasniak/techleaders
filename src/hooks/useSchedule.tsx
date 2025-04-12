import { CalendarEvent } from "../Schedule";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


const fetchEvents = async (): Promise<CalendarEvent[]> => { // symulacja pobierania danych z API
  const response = await fetch("/events.json"); 
  if (!response.ok) { 
    throw new Error("Failed to fetch events");
  }
  return await response.json(); // zwrócenie danych w formacie JSON
};

export const useSchedule = () => { // hook do zarządzania kalendarzem
  const queryClient = useQueryClient(); // hook do zarządzania cachem zapytań

  const { data: events = [], isLoading: loading, error } = useQuery<CalendarEvent[], Error>({ // hook do pobierania danych
    queryKey: ["events"], // klucz zapytania
    queryFn: fetchEvents, // funkcja do pobierania danych
    staleTime: 1000 * 60 * 5, // czas, przez jaki dane są uważane za świeże
  });

  const addEventMutation = useMutation({ // hook do mutacji danych
    mutationFn: async (newEvent: CalendarEvent) => { // funkcja do dodawania nowego eventu
      // symulacja zapisu np. do API – tutaj tylko zwracam to samo, ale mozna np. zrobić POST
      return new Promise<CalendarEvent>((resolve) => { 
        setTimeout(() => resolve(newEvent), 300); 
      });
    },
    onSuccess: (newEvent) => { // dodanie nowego eventu do cache
      queryClient.setQueryData<CalendarEvent[]>(["events"], (old = []) => [...old, newEvent]); // aktualizacja cache
    },
  });

  const handleEventClick = (event: CalendarEvent) => { // obsługa kliknięcia w event
    alert(`This hour is occupied by: ${event.title}`); // wyświetlenie alertu z tytułem eventu
  };

  const handleEmptyDateClick = (date: Date) => { // obsługa kliknięcia w pustą datę
    const newEvent: CalendarEvent = { // nowy event do dodania
      dateStart: Math.floor(date.getTime() / 1000), // początek eventu 
      dateEnd: Math.floor(date.getTime() / 1000) + 3600, // koniec eventu
      title: "New event", 
    };

    addEventMutation.mutate(newEvent); // dodanie nowego eventu
  };

  return { // zwracane wartości z hooka
    events,
    loading,
    error: error ? error.message : null,
    handleEventClick,
    handleEmptyDateClick,
  };
};
