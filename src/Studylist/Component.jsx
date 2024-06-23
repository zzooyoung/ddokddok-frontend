import React from "react";

const Component = ({ className }) => {
  return (
    <div className={`component ${className}`}>
      {/* <img src={image} alt="Component Image" /> */}
      <div className="component-text">Component Text</div>
    </div>
  );
};

export default Component;
