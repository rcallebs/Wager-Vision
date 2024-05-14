import React, { useEffect } from "react";

const CloseButton = ({ id, setOpen }) => {
  useEffect(() => {
    const savedOpenState = localStorage.getItem(`bet-${id}-open`);
    if (savedOpenState !== null) {
      setOpen(JSON.parse(savedOpenState));
    }
  }, [id, setOpen]);

  const handleOutcome = () => {
    setOpen(false);
    localStorage.setItem(`bet-${id}-open`, JSON.stringify(false));
  };

  return <button onClick={handleOutcome}>Close Bet</button>;
};

export default CloseButton;
