import React, { useEffect } from "react";

const CloseButton = ({ id, setOpen, setOutcome }) => {
  useEffect(() => {
    const savedOpenState = localStorage.getItem(`bet-${id}-open`);
    const savedOutcome = localStorage.getItem(`bet-${id}-outcome`);
    if (savedOpenState !== null) {
      setOpen(JSON.parse(savedOpenState));
    }
    if (savedOutcome !== null) {
      setOutcome(savedOutcome);
    }
  }, [id, setOpen, setOutcome]);

  const handleOutcome = (outcome) => {
    setOpen(false);
    setOutcome(outcome);
    localStorage.setItem(`bet-${id}-open`, JSON.stringify(false));
    localStorage.setItem(`bet-${id}-outcome`, outcome);
  };

  return (
    <div>
      <button onClick={() => handleOutcome("Win")}>Close as Win</button>
      <button onClick={() => handleOutcome("Loss")}>Close as Loss</button>
    </div>
  );
};

export default CloseButton;
