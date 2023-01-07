import React, { useState } from "react";
import ManageHODs from "./ManageHODs";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import DisplayHODs from "./DisplayHODs";

function Admin() {
  const [selected, setSelected] = useState("Dashboard");
  const [hodDept, setHodDept] = useState("")
  return (
    <div>
      <Navbar setSelected={setSelected} />
      {selected === "Dashboard" ? <Dashboard /> : selected==="ManageHODs" ?<ManageHODs hodDept={hodDept} setHodDept={setHodDept}/>:<DisplayHODs/>}
    </div>
  );
}

export default Admin;
