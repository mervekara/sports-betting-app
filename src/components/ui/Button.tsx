import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button = ({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const base = "px-4 py-2 rounded-md font-medium focus:outline-none transition";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const combinedClassName = `${base} ${variants[variant]} ${className}`.trim();

  return <button {...props} className={combinedClassName} />;
};
