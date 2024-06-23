import React from "react";

const TagComponent = ({ className, tag, onClick }) => {
  return (
    <button
      className={`component ${className}`}
      onClick={() => onClick(tag.tag_id)}
    >
      <div className="component-text">{tag.tag_name}</div>
    </button>
  );
};

export default TagComponent;
