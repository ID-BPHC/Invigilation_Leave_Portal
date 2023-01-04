import React, { useState } from "react";
import ManageHODs from "./ManageHODs";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";

function Admin() {
  const [selected, setSelected] = useState("");
  const [hodDept, setHodDept] = useState("")
  return (
    <div>
      <Navbar setSelected={setSelected} />
      {selected === "Dashboard" ? <Dashboard /> : <ManageHODs hodDept={hodDept} setHodDept={setHodDept}/>}
    </div>
  );
}

export default Admin;
