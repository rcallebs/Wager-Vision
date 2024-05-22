import React from "react";

const ShortDate = ({ dateTimeString }) => {
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";

    const dateTime = new Date(dateTimeString);

    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const year = String(dateTime.getFullYear()).slice(-2);
    const hours = dateTime.getHours();
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedDateTime = `${month}/${day}/${year} ${formattedHours}:${minutes} ${ampm}`;

    return formattedDateTime;
  };

  return <>{formatDateTime(dateTimeString)}</>;
};

export default ShortDate;
