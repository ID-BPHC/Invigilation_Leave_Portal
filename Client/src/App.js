import Signin from "./GoogleOAuth/Signin";
import { Routes, Route } from "react-router-dom";
import Admin from "./Admin/Admin";
import HOD from "./HOD/HOD";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Signin />} />
      {/* <Route exact path="/admin" element={<Admin />} />
      <Route exact path="/hod" element={<HOD />} /> */}
    </Routes>
  );
}

export default App;
