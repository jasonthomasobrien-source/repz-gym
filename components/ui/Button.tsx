import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantStyles = {
  primary: "bg-brand text-black border border-brand hover:bg-brand-dark transition-colors",
  secondary: "bg-transparent text-brand-alt border border-brand-alt hover:bg-brand-alt/10 transition-colors",
  ghost: "bg-transparent text-brand-alt hover:text-brand hover:underline",
  danger: "bg-red-600 text-white border border-red-600 hover:bg-red-700 transition-colors",
};

const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-sm font-display font-bold uppercase tracking-wide transition-colors duration-150";
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const combinedClassName = `${baseStyles} ${variantStyle} ${sizeStyle} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
