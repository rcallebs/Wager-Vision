import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const ToBets = ({ open }) => {
  let navigate = useNavigate();

  const handleClick = () => {
    if (open) {
      navigate("/bets");
    } else {
      navigate("/settled-bets");
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      <ArrowBack icon={ArrowBack} size="2x" />{" "}
      {open ? "Open Bets" : "Settled Bets"}
    </button>
  );
};

export default ToBets;
