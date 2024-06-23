// Button.jsx
import React from "react";
import "./style.css";

const Button = ({ className, text, style }) => {
  return (
    <button className={`button ${className}`} style={style}>
      <div className="text-wrapper-13">{text}</div>
    </button>
  );
};

export default Button;
