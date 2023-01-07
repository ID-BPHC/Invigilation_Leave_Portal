import React from "react";
import Navbar from "./HODNavbar";
import Dashboard from "./HODDashboard";

function HOD({ department }) {
  return (
    <div>
      <Navbar />
      <Dashboard department={department} />
    </div>
  );
}

export default HOD;
