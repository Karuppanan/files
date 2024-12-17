

import React, { useRef, useEffect, useState } from "react";

const Popover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const handleClickOutside = (event) => {
    // Check if the click is outside the popover
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsOpen(false); // Close the popover
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Attach the event listener when the popover is open
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Clean up the event listener when the popover is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Button to toggle the popover */}
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Popover</button>

      {/* Popover content */}
      {isOpen && (
        <div ref={popoverRef} style={styles.popover}>
          <p>This is the popover content!</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  popover: {
    position: "absolute",
    top: "50px",
    left: "50px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    zIndex: 1000,
  },
};

export default Popover;
