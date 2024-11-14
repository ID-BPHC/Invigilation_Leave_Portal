import React, { useState, useRef, useEffect } from "react";
import "./form.css";
import Calendar from "react-select-date";

const REGEX = new RegExp(`(H[0-9]{4})|(41[0-3]20[1-2][0-9][0-9]{4})`);

export default function Form() {
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;
  const [formData, setFormData] = useState();
  const idRef = useRef();
  const branchRef = useRef();
  const [multipleDate, setMultipleDate] = useState([]);
  const [date, SetDate] = useState({
    start: "",
    end: "",
  });

  async function getDates() {
    var response = await fetch(`${REACT_APP_APIURL}/api/leave/admin/getDate`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    SetDate(response);
  }

  useEffect(() => {
    getDates();
  }, []);

  async function postData(
    url = `${REACT_APP_APIURL}/api/leave/submit`,
    data = {}
  ) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }

  const inputChangeHandler = (e) => {
    setFormData(e.target.value);
  };

  const handleDateSelection = (dates) => {
    setMultipleDate(dates);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (multipleDate.length > 4) {
      alert("You can only apply for a maximum of 4 days leave.");
      return;
    }

    if (!REGEX.test(idRef.current.value)) {
      alert("Please Enter Valid ID");
      return;
    }

    const displayName = localStorage.getItem("displayName");
    const email = localStorage.getItem("email");

    let submitData = {
      reason: formData,
      id: idRef.current.value,
      multipleDate,
      name: displayName,
      email: email,
      branch: branchRef.current.value,
    };

    postData(`${REACT_APP_APIURL}/api/leave/submit`, submitData).then((res) =>
      console.log(res)
    );

    alert("Leave Request Submitted!!");
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
      <header className=" scale-[0.25] mt-[-5%] ml-[-50%]">
        <img
          className="header-img"
          alt="TD-Logo"
          src={require("../img/tdlogo-01.png")}
        ></img>
      </header>
      <div id="form-fields" style={{ marginTop: "-8vh" }}>
        <div id="form-heading" className="my-10 text-2xl">
          <h1>
            <strong>Time Table Division Leave Portal</strong>
          </h1>
        </div>
        <form
          className="px-4 max-w-3xl mx-auto space-y-6"
          onSubmit={submitHandler}
        >
          <h3>
            Welcome, <strong>{localStorage.getItem("displayName")}</strong>
          </h3>
          <br />

          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label inline-block mb-2 text-gray-700 font-bold"
              >
                Reason for Leave:
              </label>
              <br />
              <textarea
                name="reason"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlTextarea1"
                rows="3"
                required
                onChange={inputChangeHandler}
              ></textarea>
              <br />
            </div>
          </div>
          <label className="text-red-500 text-sm">
            ** Note: If you have multiple reasons for different dates, please
            mention them accordingly. You can only apply for a maximum of 4 days leave.<br />
            If you submit the form multiple times, only the most recent request
            will be taken into consideration, and any previous requests will not
            be reviewed.
          </label>
          <br />
          <br />
          <div className="flex justify-center">
            <Calendar
              onSelect={handleDateSelection}
              templateClr="blue"
              selectDateType="multiple"
              showDateInputField={false}
              minDate={date.start}
              maxDate={date.end}
              required
            />
          </div>
          <div>
            Note: ID should be of format <b>41220221234</b> and PSRN should be
            of the format <b>H0234</b>
          </div>
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96 flex flex-row w-full">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label inline-block p-4 text-gray-700"
              >
                ID/PSRN:
              </label>
              <input
                type="text"
                name="id"
                className="form-control block px-3 w-4/5 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
              <option defaultValue>Biological Sciences</option>
              <option>Chemical Engineering</option>
              <option>Chemistry</option>
              <option>Civil Engineering</option>
              <option>Computer Science and Information Systems</option>
              <option>Economics and Finance</option>
              <option>Electrical and Electronics Engineering</option>
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
