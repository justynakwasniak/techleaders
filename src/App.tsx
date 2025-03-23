// App.tsx

import React from "react";
import Schedule from "./components/Schedule/Schedule";
import { useSchedule } from "./utils/useSchedule";

const App: React.FC = () => {
  const { events, loading, error, handleEventClick, handleEmptyDateClick } = useSchedule();
  const Loader = () => (
    <div className="loader">Loading...</div>
  );

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
 