import React, { useState } from "react";
import axios from "axios";

function OddsData() {
  const [odds, setOdds] = useState(null);

  const getOdds = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/odds`, {
        params: {
          sportKey: "upcoming",
          regions: "us",
          markets: "h2h",
          oddsFormat: "decimal",
          dateFormat: "iso",
        },
      });
      setOdds(response.data);
    } catch (error) {
      console.error("Error fetching odds:", error);
    }
  };

  return (
    <div>
      <h2>Odds Data</h2>
      <button onClick={getOdds}>Get Odds</button>
      <pre>{odds && JSON.stringify(odds, null, 2)}</pre>
    </div>
  );
}

export default OddsData;
