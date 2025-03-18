export const roundToNearestHalfHour = (date: Date): Date => { 
    const minutes = date.getMinutes();
    
    if (minutes < 30) { 
      date.setMinutes(0, 0, 0);
    } 
    
    else if (minutes > 30) {
      date.setMinutes(30, 0, 0);
      date.setHours(date.getHours() + 1);
    } 
    else if (minutes === 30) {
      date.setMinutes(30, 0, 0); 
    }
    
    return date;
  };
  