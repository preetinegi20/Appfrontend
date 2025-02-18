// src/components/ui/alert.js
import React from "react";

// Alert component to display alert messages
export function Alert({ type, children }) {
  let alertClass = "";

  // Assign CSS class based on alert type
  switch (type) {
    case "success":
      alertClass = "alert-success";
      break;
    case "error":
      alertClass = "alert-error";
      break;
    case "warning":
      alertClass = "alert-warning";
      break;
    default:
      alertClass = "alert-info";
  }

  return <div className={`alert ${alertClass}`}>{children}</div>;
}

// AlertDescription component to describe the alert content
export function AlertDescription({ children }) {
  return <p>{children}</p>;
}
