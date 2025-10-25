import React from "react";
import "../../styles/common/buttons.scss";

const Button = ({ children, onClick, variant = "default", className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
