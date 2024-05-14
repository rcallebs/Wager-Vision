import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OddsData() {
  const [odds, setOdds] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const getOdds = async () => {
    try {
      setIsFetching(true);
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
      navigate("/odds");
    } catch (error) {
      console.error("Error fetching odds:", error);
    } finally {
      setIsFetching(false);
    }
  };

  if (odds) {
    return (
      <div>
        <h2>Odds Data</h2>
        <pre>{JSON.stringify(odds, null, 2)}</pre>
      </div>
    );
  }

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Odds Data</h2>
      <button onClick={getOdds}>Get Odds</button>
    </div>
  );
}

export default OddsData;
