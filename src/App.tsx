import React from "react";
import Schedule from "./components/Schedule/Schedule";
import { useSchedule } from "./hooks/useSchedule";
import Loader from "./components/Schedule/components/Loader";

const App: React.FC = () => {
  const { events, loading, error, handleEventClick, handleEmptyDateClick } = useSchedule();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
