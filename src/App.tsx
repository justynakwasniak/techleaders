import React from "react";
import Schedule from "./components/Schedule/Schedule";
import { useSchedule } from "./hooks/useSchedule";
import Loader from "./components/Schedule/components/Loader";
import { useAuth } from "./components/context/AuthContext";

const App: React.FC = () => {
  const { user, login, logout } = useAuth();
  const { events, loading, error, handleEventClick, handleEmptyDateClick } = useSchedule(user);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl mb-4">Welcome in my app</h2>
        <button onClick={() => login("Anna")}>Log in as Anna</button>
        <button onClick={() => login("Jan")}>Log in as Jan</button>
      </div>
    );
  }

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <div className="flex justify-between p-4">
        <p>Logged in as: <strong>{user.username}</strong></p>
        <button onClick={logout}>Log out</button>
      </div>
      <Schedule
        events={events}
        onEventClick={handleEventClick}
        onEmptyDateClick={handleEmptyDateClick}
      />
    </div>
  );
};

export default App;
