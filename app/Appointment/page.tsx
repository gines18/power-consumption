"use client";

import React, { useEffect } from "react";

function Meeting() {
  useEffect(() => {
    // Create script element and append it to the document
    const script = document.createElement("script");
    script.src = "https://server.fillout.com/embed/v1/";
    script.async = true; // Optional: load script asynchronously
    document.body.appendChild(script);

    // Cleanup: remove script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    
    <div
      style={{ width: "100%", height: "500px" }}
      data-fillout-id="8WEr7A8oYsus"
      data-fillout-embed-type="standard"
      data-fillout-inherit-parameters
      data-fillout-dynamic-resize
    >
      {/* The external script may modify this div */}
    </div>

  );
}

export default Meeting;
