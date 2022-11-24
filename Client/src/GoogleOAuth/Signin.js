import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Form from "../components/Form";
import './signin.css'

function Signin() {
  const [value, setValue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.displayName);
      localStorage.setItem("displayName", data.user.displayName);
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("displayName"));
  });
  return (
    <div>
      {value ? (
        <Form />
      ) : (<>
        <header>
          <img className="header-img" src={require('../img/tdlogo-01.png')}></img>
        </header>
        <div className="text-center justify-center m-auto login">
          <h2 className=" lg:text-5xl md:text-4xl m-20">Welcome to Time Table Division's Leave Portal</h2>
          <button className="sd:scale-50" onClick={handleClick}>
            <img src={require('../img/login.png')} className="m-10 h-10" alt="Login With Google" />Login With Google
          </button>
        </div></>
      )}
    </div>
  );
}

export default Signin;
