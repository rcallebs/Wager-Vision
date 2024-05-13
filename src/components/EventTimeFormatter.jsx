import React from "react";

const EventTimeFormatter = ({ dateTimeString }) => {
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";

    const dateTime = new Date(dateTimeString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "America/New_York",
    };

    return new Intl.DateTimeFormat("en-US", options).format(dateTime);
  };

  return <>{formatDateTime(dateTimeString)}</>;
};

export default EventTimeFormatter;
