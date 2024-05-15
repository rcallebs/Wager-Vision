import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MatchCard from "../components/MatchCard";
import MatchDetails from "../components/MatchDetails";

// function OddsData() {
//   const [odds, setOdds] = useState(null);
//   const [isFetching, setIsFetching] = useState(false);
//   const navigate = useNavigate();

//   const getOdds = async () => {
//     try {
//       setIsFetching(true);
//       const response = await axios.get(`http://localhost:4000/api/odds`, {
//         params: {
//           sportKey: "upcoming",
//           regions: "us",
//           markets: "h2h",
//           oddsFormat: "decimal",
//           dateFormat: "iso",
//         },
//       });
//       setOdds(response.data);
//       navigate("/odds");
//     } catch (error) {
//       console.error("Error fetching odds:", error);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   if (odds) {
//     return (
//       <div>
//         <h2>Odds Data</h2>
//         <pre>{JSON.stringify(odds, null, 2)}</pre>
//       </div>
//     );
//   }

//   if (isFetching) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h2>Odds Data</h2>
//       <button onClick={getOdds}>Get Odds</button>
//     </div>
//   );
// }

// export default OddsData;
function OddsData() {
  const [odds, setOdds] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [error, setError] = useState(null);
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
    } catch (error) {
      setError("Error fetching odds. Please try again later.");
      console.error("Error fetching odds:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  const handleCloseModal = () => {
    setSelectedMatch(null);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (odds) {
    return (
      <div>
        <h2>Odds Data</h2>
        <div className="container">
          <div className="row">
            {odds.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onClick={handleMatchClick}
              />
            ))}
          </div>
          <MatchDetails
            isOpen={selectedMatch !== null}
            match={selectedMatch}
            onClose={handleCloseModal}
          />
        </div>
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
