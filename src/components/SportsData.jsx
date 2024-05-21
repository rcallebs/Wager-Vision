import React, { useState } from "react";
import axios from "axios";

function SportsData() {
  const [sports, setSports] = useState(null);

  const getSports = async () => {
    try {
      const response = await axios.get(
        `https://wager-server-946d5db015ae.herokuapp.com/api/sports`
      );
      setSports(response.data);
    } catch (error) {
      console.error("Error fetching available sports:", error);
    }
  };

  return (
    <div>
      <h2>Upcoming Events</h2>
      <button onClick={getSports}>Get Info</button>
      <pre>{sports && JSON.stringify(sports, null, 2)}</pre>
    </div>
  );
}

export default SportsData;
