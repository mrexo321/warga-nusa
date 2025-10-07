import React from "react";

const Section = ({
  children,
  className = "",
  background = "white",
  padding = "default",
}) => {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    yellow: "bg-yellow-50",
  };

  const paddings = {
    small: "py-8 lg:py-12",
    default: "py-12 lg:py-16",
    large: "py-16 lg:py-24",
  };

  return (
    <section
      className={`${backgrounds[background]} ${paddings[padding]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};

export default Section;
