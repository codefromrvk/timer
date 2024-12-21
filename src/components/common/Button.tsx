import { HTMLProps } from "react";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  type = "button",
  variant,
  onClick,
  className,
  children,
  ...rest
}: ButtonProps) => {
  // TODO: Use Class Variance Authority and tailwind merge
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
        variant === "secondary"
          ? "text-gray-700 bg-gray-100 hover:bg-gray-200 "
          : variant === "text"
          ? ""
          : "text-white bg-blue-600 hover:bg-blue-700"
      }
      
      ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
