import { CalendarEvent } from "../components/Schedule";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


 
const fetchEvents = async (): Promise<CalendarEvent[]> => {
  const response = await fetch("/events.json"); 
  if (!response.ok) { 
    throw new Error("Failed to fetch events");
  }
  return await response.json(); 
};

export const useSchedule = () => { 
  const queryClient = useQueryClient(); 

  const { data: events = [], isLoading: loading, error } = useQuery<CalendarEvent[], Error>({ 
    queryKey: ["events"], 
    queryFn: fetchEvents, 
  });

  const { mutate: eventEdit } = useMutation({
    mutationFn: async (newEvent: CalendarEvent) => {
      return new Promise<CalendarEvent>((resolve) => { 
        setTimeout(() => resolve(newEvent), 300); 
      });
    },
    onSuccess: (newEvent) => {
      queryClient.setQueryData<CalendarEvent[]>(["events"], (old = []) => [...old, newEvent]);
    },
  });

  const handleEventClick = (event: CalendarEvent) => {
    alert(`This hour is occupied by: ${event.title}`);
  };

  const handleEmptyDateClick = (date: Date) => { 
    const newEvent: CalendarEvent = { 
      dateStart: Math.floor(date.getTime() / 1000),
      dateEnd: Math.floor(date.getTime() / 1000) + 3600, 
      title: "New event", 
    };

    eventEdit(newEvent); 
  };

  return { 
    events,
    loading,
    error: error ? error.message : null,
    handleEventClick,
    handleEmptyDateClick,
  };
};
