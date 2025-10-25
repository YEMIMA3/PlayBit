import React from "react";
import "../../styles/common/loader.scss";

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
}
