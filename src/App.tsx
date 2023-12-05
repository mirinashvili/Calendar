import React from "react";
import Calendar from "./componets/Calentar";

const App: React.FC = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  return (
    <div
      className="App"
      style={{
        height: "780px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Calendar year={year} month={month} />
    </div>
  );
};

export default App;
