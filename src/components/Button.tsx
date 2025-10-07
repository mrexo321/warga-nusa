import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg";

  const variants = {
    primary:
      "bg-yellow-400 hover:bg-yellow-500 text-black focus:ring-yellow-300",
    secondary:
      "bg-black hover:bg-gray-800 text-yellow-400 focus:ring-yellow-300",
    outline:
      "border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:ring-yellow-300",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
