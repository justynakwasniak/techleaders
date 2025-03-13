export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); 
  let hours = date.getHours().toString();  
  let minutes = date.getMinutes().toString();  
  if (hours.length < 2) hours = '0' + hours;
  if (minutes.length < 2) minutes = '0' + minutes;

  return `${hours}:${minutes}`;
};
