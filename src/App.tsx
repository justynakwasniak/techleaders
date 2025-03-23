import React from "react";
import Schedule from "./components/Schedule/Schedule";
import { useSchedule } from "./utils/useSchedule";

const App: React.FC = () => {
  const { events, handleEventClick, handleEmptyDateClick } = useSchedule();

  return (
    <div className="App">
      <Schedule 
        events={events} 
        onEventClick={handleEventClick} 
        onEmptyDateClick={handleEmptyDateClick} 
      />
    </div>
  );
};

export default App;