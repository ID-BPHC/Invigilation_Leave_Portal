import React, { useState, useRef } from "react";
import {REACT_APP_APIURL} from '../config'

import "./form.css";
import Calendar from "react-select-date";

const REGEX = new RegExp(`(H[0-9]{4})|(41[0-3]20[1-2][0-9][0-9]{4})`) 


export default function Form() {
  // const [showDate, setShowDate] = useState(false);
  const [formData, setFormData] = useState();
  const idRef = useRef();
  const branchRef = useRef()
  const [multipleDate, setMultipleDate] = useState();
  // const [credentials, setCredentials] = useState({email:"", name:""});
  // useEffect(()=>{
  //   const newObj = {
  //     email: localStorage.getItem('email'),
  //     name: localStorage.getItem('displayName')
  //   }
  //   setCredentials(newObj)
  // }, [])
  async function postData(url = `${REACT_APP_APIURL}/submit`, data = {}) {

   
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  const inputChangeHandler = (e, i) => {
    setFormData((prev) => e.target.value);
    console.log(e.target.value);
  };
  
  const submitHandler = (event) => {
    if(!REGEX.test(idRef.current.value)){
      alert('Please Enter Valid ID')
      return
    }
    const displayName = localStorage.getItem('displayName')
    const email = localStorage.getItem('email')
    event.preventDefault();
    // console.log(showDate);
    let submitData = {
      reason: formData,
      id: idRef.current.value,
      multipleDate,
      name:displayName,
      email:email,
      branch: branchRef.current.value
    };
 
    postData(`${REACT_APP_APIURL}/submit/`, submitData).then((res) =>
      console.log(res)
    );
    
    alert('Email sent successfully!');
    localStorage.clear();
    window.location.reload();

  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div
      id="main-form"
      className="justify-center text-center bg-no-repeat w-full absolute"
    >
      <image src={require("../img/tdlogo-01.png")} alt="img" width="100px" />
      <div id="form-fields">
        <div id="form-heading" className="my-10 text-2xl">
          <h1>
            <strong>Time Table Division Leave Portal</strong>
          </h1>
        </div>
        <form
          className="px-4 max-w-3xl mx-auto space-y-6"
          onSubmit={submitHandler}
        >
           <h3>Welcome, <strong>{localStorage.getItem("displayName")}</strong></h3>
          <br />

          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <label
                for="exampleFormControlTextarea1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Reason for Leave, If you have multiple reasons for different dates, please mention them below
              </label>
              <br />
              <textarea
                name="reason"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlTextarea1"
                rows="3"
                required
                onChange={(e) => inputChangeHandler(e, 1)}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center">
          {true ? (
            <Calendar
              onSelect={(date) => setMultipleDate(date)}
              templateClr="blue"
              selectDateType="multiple"
              showDateInputField={false}
              minDate="2022-12-16"
              maxDate="2023-12-31"
            />
          ) : null}
          </div>
        <div>
        Note: ID should be of format <b>41220221234</b> and PSRN should be of the format <b>H0234</b>
        </div>
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96 flex flex-row w-full">
              <label
                for="exampleFormControlInput1"
                className="form-label inline-block p-4 text-gray-700"
              >
                ID/PSRN:
              </label>
              <input
                type="text"
                name="id"
                placeholder=""
                className="
                  form-control
                  block
                  px-3
                  w-4/5
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                id="exampleFormControlInput1"
                ref={idRef}
                required
              />
            </div>
          </div>

          <div>
            <select
              name="branch"
              className="inline-flex justify-center text-center rounded-md border m-2 p-4 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              ref={branchRef}
            >
              <option default selected>Biological Sciences</option>
              <option>Chemical Engineering</option>
              <option>Chemistry</option>
              <option>Civil Engineering</option>
              <option>Computer Science and Information Systems</option>
              <option>Economics and Finance</option>
              <option>Electrical and Electronics Engineerin</option>
              <option>Humanities and Social Sciences</option>
              <option>Mathematics</option>
              <option>Mechanical Engineering</option>
              <option>Pharmacy</option>
              <option>Physics</option>
            </select>
          </div>
          <div className="flex flex-row justify-center align-middle text-center my-5">
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full my-[5%]"
            >
              Submit for Approval
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
            type="button"
              className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full my-[5%]"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
