import Signin from "./GoogleOAuth/Signin";
import { Routes, Route } from "react-router-dom";
import Admin from "./Admin/Admin";
import HOD from "./HOD/HOD";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Signin />} />
      <Route exact path="/admin" element={<Admin />} />
      <Route exact path="/hod" element={<HOD />} />
    </Routes>
  );
}

export default App;



/*
  1 link hod to db hod portal login
  2 admin portal approve/deny and student confirmation
  3 student portal select only from start and end dates
  4 admin portal should have option to set start and end dates
*/



