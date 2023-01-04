import React, { useState } from "react";

function ManageHODs({ hodDept, setHodDept }) {
  const options = [
    { value: "", text: "-- Select Dept --" },
    { value: "Civil Engg", text: "Civil Engg" },
    { value: "Chemical Engg", text: "Chemical Engg" },
    { value: "EEE", text: "EEE" },
    { value: "Mechanical Engg", text: "Mechanical Engg" },
    { value: "Pharmacy", text: "Pharmacy" },
    { value: "Computer Sciences", text: "Computer Sciences" },
    { value: "ENI", text: "ENI" },
    { value: "ECE", text: "ECE" },
    { value: "Biological Sciences", text: "Biological Sciences" },
    { value: "Chemistry", text: "Chemistry" },
    { value: "Economics", text: "Economics" },
    { value: "Physics", text: "Physics" },
    { value: "Maths", text: "Maths" },
  ];
  const [selector, setSelector] = useState("");

  return (
    <div className="my-5 py-2 text-center items-center">
      <div className="text-center text-3xl m-auto text-black my-5 py-2">
        ManageHODs
      </div>
      <div className="text-center items-center mx-auto">
        <form
          method="submit"
          className="text-center items-center mx-auto flex flex-col my-4"
        >
          <select
            defaultValue={options[0].value}
            value={selector}
            className="text-center items-center h-auto bg-slate-300 p-4 m-auto rounded-xl"
            required
            onChange={(e) => {
              setHodDept(e.target.value);
              setSelector(e.target.text);
              // console.log(hodDept);
            }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>

          <h4 className="my-4">Add Email : </h4>
          <input
            type="email"
            required
            className="mx-4 h-12 rounded-md w-1/4 p-4 text-center border"
          />
          <button className="my-6 hover:bg-yellow-200">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ManageHODs;
