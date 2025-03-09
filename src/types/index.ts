export interface   CalendarEvent { // pojedyncze wydarzenie
    dateStart: number; 
    dateEnd: number; 
    title: string;
  }
  
  export type CalendarData = CalendarEvent[]; // lista wydarzeń
  
  export interface WeekDate { // pojedynczy dzień tygodnia
    day: number;
    month: number;
    year: number;
  }
  