import React, { useState } from "react";
import "./style.css";

const TextArea = ({ className, placeholder }) => {
  const [value, setValue] = useState("");

  return (
    <textarea
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default TextArea;
