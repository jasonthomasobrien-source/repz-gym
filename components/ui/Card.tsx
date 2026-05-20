import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "paper";
}

export function Card({
  variant = "dark",
  className = "",
  ...props
}: CardProps) {
  const bgClass = variant === "dark" ? "bg-surface" : "bg-paper text-paper-ink";
  return (
    <div
      className={`rounded-md border border-line p-7 ${bgClass} ${className}`}
      {...props}
    />
  );
}
