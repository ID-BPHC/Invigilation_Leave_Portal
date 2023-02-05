import React, { useState } from "react";
import ManageHODs from "./ManageHODs";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import DisplayHODs from "./DisplayHODs";
import Date from "./Date";
import Accept from "./Accept";

function Admin() {
  const [selected, setSelected] = useState("Dashboard");
  const [hodDept, setHodDept] = useState("")
  return (
    <div>
      <Navbar setSelected={setSelected} />
      {selected === "Dashboard" ? <Dashboard /> : selected === "ManageHODs" ? <ManageHODs hodDept={hodDept} setHodDept={setHodDept} /> : selected === "Date" ? <Date /> : selected === "Accept" ? <Accept /> : <DisplayHODs />}
    </div>
  );
}

export default Admin;
