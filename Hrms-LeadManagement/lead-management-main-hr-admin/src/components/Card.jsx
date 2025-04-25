import React from "react";

export function Card({ children, className = "" }) {
  return <div className={`bg-white p-4 rounded-lg shadow ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}

