import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand hover:bg-brand-hot text-white",
  secondary: "border border-ink text-white hover:bg-surface-2",
  ghost: "text-ink-muted hover:text-ink",
  danger: "bg-danger hover:opacity-90 text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs font-display uppercase tracking-button",
  md: "px-4 py-3 text-sm font-display uppercase tracking-button",
  lg: "px-6 py-4 text-base font-display uppercase tracking-button",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-sm transition-colors duration-150 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    />
  );
}
