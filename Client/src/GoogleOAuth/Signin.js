import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Form from "../components/Form";
import { HOD_Data } from "../Admin/HOD_Data";
import Admin from "../Admin/Admin";
import HOD from "../HOD/HOD";
import { REACT_APP_APIURL } from '../config'
// import "./signin.css";

function Signin() {
  const [value, setValue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("displayName", data.user.displayName);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("photoURL", data.user.photoURL);
    });
  };

  const[accept,setAccept] = useState({
    student_portal:false,
    hod_portal:false,
  })
  async function getPermission(){
    var response = await fetch(`${REACT_APP_APIURL}/api/leave/admin/getPermission`,{
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setAccept(response);
  }

  useEffect(() => {
    setValue(localStorage.getItem("email"));
    getPermission();
  }, []);
  return (
    <div>
      {value ? (
        value === "td@hyderabad.bits-pilani.ac.in" || "f20212587@hyderabad.bits-pilani.ac.in" ? (
          <Admin />
        ) : HOD_Data.some((i) => i.hod.some((j) => j === value))? ( // needs fix
        accept.hod_portal === false ?
          <HOD
            department={
              HOD_Data.filter((hod) => hod.hod.some((j) => j === value))[0]
                .value
            }
          /> : <h3 className="text-center justify-center text-3xl flex mt-[25%]" >Hod Portal is Closed </h3>
        ) : (
          accept.student_portal === false? 
          <Form /> : <h3 className="text-center justify-center text-3xl flex mt-[25%]" >Student Portal is Closed</h3>
        )
      ) : (
        <div className=" min-h-screen absolute overflow-auto w-full bg-black/5">
          <header className=" scale-[0.25] mt-[-5%] ml-[-50%]">
            <img
              className="header-img"
              alt="TD-Logo"
              src={require("../img/tdlogo-01.png")}
            ></img>
          </header>
          <div className="text-center justify-center align-middle m-auto relative flex flex-col">
            <h2 className="lg:text-5xl md:text-4xl m-20">
              Welcome to Time Table Division's Leave Portal
            </h2>
            <div className="flex flex-row mx-auto w-3/4 items-center justify-center">
              <button
                className="hover:bg-slate-300 mx-3 px-4 py-2 border-4 rounded-md bg-slate-200 lg:text-lg md:text-sm sm:text-xs items-center justify-center"
                onClick={handleClick}
              >
                <img
                  src={require("../img/login.png")}
                  className="scale-50"
                  alt="Login With Google"
                />
                Login With Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signin;
