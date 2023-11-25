import { useEffect, useState } from "react";

export default function Accept() {
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

  const [accept, setAccept] = useState({
    student_portal: false,
    hod_portal: false,
  });

  const [value1, setValue] = useState({
    student_portal: false,
    hod_portal: false,
  });

  const [studentBtnClicked, setStudentBtnClicked] = useState(false);
  const [hodBtnClicked, setHodBtnClicked] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${REACT_APP_APIURL}/admin/permission`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accept),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();

      window.alert(
        `${accept.student_portal ? "Student Portal is currently OPEN" : "Student Portal is currently CLOSED"} and ${accept.hod_portal ? "HOD Portal is currently OPEN" : "HOD Portal is currently CLOSED"
        }`
      );

      window.location.reload();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  async function getPermission() {
    try {
      const response = await fetch(`${REACT_APP_APIURL}/admin/getPermission`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setValue(data);
    } catch (error) {
      console.error('There was a problem with fetching permissions:', error);
    }
  }

  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    setAccept(prevAccept => ({
      ...prevAccept,
      student_portal: value1.student_portal,
    }));
  }, [value1.student_portal]);

  useEffect(() => {
    setAccept(prevAccept => ({
      ...prevAccept,
      hod_portal: value1.hod_portal,
    }));
  }, [value1.hod_portal]);

  const toggleStudentPortal = () => {
    setValue(prevValue => ({
      ...prevValue,
      student_portal: !prevValue.student_portal,
    }));
    setStudentBtnClicked(!studentBtnClicked);
  };

  const toggleHODPortal = () => {
    setValue(prevValue => ({
      ...prevValue,
      hod_portal: !prevValue.hod_portal,
    }));
    setHodBtnClicked(!hodBtnClicked);
  };


  return (
    <>
      <div className="text-center items-center mx-auto flex flex-col my-4">
        <h4 className="my-4">
          {value1.student_portal ? "Student Portal is Open" : "Student Portal is Closed"}
        </h4>
        <button
          className={`mx-4 h-12 rounded-md w-1/4 p-4 text-center border ${value1.student_portal ? "border-red-500 text-white bg-red-500" : "border-green-500 text-white bg-green-500"
            }`}
          onClick={toggleStudentPortal}
        >
          {value1.student_portal ? "Click to Close" : "Click to Open"}
        </button>
        <h4 className="my-4">
          {value1.hod_portal ? "HOD Portal is Open" : "HOD Portal is Closed"}
        </h4>
        <button
          className={`mx-4 h-12 rounded-md w-1/4 p-4 text-center border ${value1.hod_portal ? "border-red-500 text-white bg-red-500" : "border-green-500 text-white bg-green-500"
            }`}
          onClick={toggleHODPortal}
        >
          {value1.hod_portal ? "Click to Close" : "Click to Open"}
        </button>
        <button
          className="my-6 hover:bg-yellow-200 px-4 py-3 border-black border-2 rounded-3xl"
          onClick={handleSubmit}
        >
          Set Permission
        </button>
      </div>
    </>
  );
}
