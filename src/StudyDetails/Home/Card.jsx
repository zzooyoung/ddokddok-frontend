// Card.jsx
import React from "react";
import "./style.css";

const Card = ({ className, children, style }) => {
  return (
    <div className={`rectangle ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
