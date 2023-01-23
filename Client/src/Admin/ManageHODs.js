import React, { useState } from "react";
import { HOD_Data } from "./HOD_Data";
import { useNavigate } from "react-router";
import {REACT_APP_APIURL} from '../config'

function ManageHODs({ hodDept, setHodDept }) {
  
  const [credentials, setCredentials] = useState({
    nameOfNewHod: "",
    deptOfNewHod: "",
    hpsrnOfNewHod: "",
    emailOfNewHod: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    var response = await fetch(`${REACT_APP_APIURL}/api/leave/admin/addHod`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameOfNewHod: credentials.nameOfNewHod,
        deptOfNewHod: credentials.deptOfNewHod,
        hpsrnOfNewHod: credentials.hpsrnOfNewHod,
        emailOfNewHod: credentials.emailOfNewHod,
      }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    response = await response.json();
    console.log(response);
    if (response) {
      window.alert("HOD data updated successfully!!");
    }
    else {
      window.alert("Error in updating the HOD data");
    }
    navigate("/admin", { replace: true });
  }

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="my-5 py-2 text-center items-center">
      <div className="text-center text-3xl m-auto text-black my-5 py-2">
        Manage HODs
      </div>
      <div className="text-center items-center mx-auto">
        <form
          method="POST"
          className="text-center items-center mx-auto flex flex-col my-4"
          onSubmit={handleSubmit}
        >
          <select
            defaultValue={HOD_Data[0].value}
            name="deptOfNewHod"
            value={credentials.deptOfNewHod}
            className="text-center items-center h-auto bg-slate-300 p-4 m-auto rounded-xl"
            required
            onChange={onChange}
          >
            <option default selected>Biological Sciences</option>
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

          <h4 className="my-4">Add Email : </h4>
          <input
            type="email"
            name="emailOfNewHod"
            required
            className="mx-4 h-12 rounded-md w-1/4 p-4 text-center border"
            onChange={onChange}
            value={credentials.emailOfNewHod}
          />
          <h4 className="my-4">Add Name : </h4>
          <input
            type="text"
            name="nameOfNewHod"
            required
            onChange={onChange}
            value={credentials.nameOfNewHod}
            className="mx-4 h-12 rounded-md w-1/4 p-4 text-center border"
          />
          <h4 className="my-4">Add HPSRN : </h4>
          <input
            type="text"
            name="hpsrnOfNewHod"
            required
            onChange={onChange}
            value={credentials.hpsrnOfNewHod}
            className="mx-4 h-12 rounded-md w-1/4 p-4 text-center border"
          />
          <button className="my-6 hover:bg-yellow-200 px-4 py-3 border-black border-2 rounded-3xl ">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ManageHODs;
