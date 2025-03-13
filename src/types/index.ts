export interface   CalendarEvent { 
    dateStart: number; 
    dateEnd: number; 
    title: string;
  }
  
  export type CalendarData = CalendarEvent[]; 
  
  export interface WeekDate { 
    day: number;
    month: number;
    year: number;
  }
  