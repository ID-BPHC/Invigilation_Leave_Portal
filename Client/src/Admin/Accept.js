import { useEffect, useState } from "react";
import { REACT_APP_APIURL } from '../config'

export default function Accept() {
    const[accept,setAccept] = useState({
        student_portal:false,
        hod_portal:false,
    });
    const[value1,setValue] = useState({
        student_portal:false,
        hod_portal:false,
    })
    const onChange = (event) => {
        setAccept({
            ...accept,
            [event.target.name]: event.target.checked?true:false,
        });
      }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        console.log(accept);
        var response = await fetch(`${REACT_APP_APIURL}/api/leave/admin/permission`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(accept),
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          });
        if(response){
            window.alert(`${accept.student_portal?"Student Portal Closed":"Student Portal Opened"} And ${accept.hod_portal?"Hod Portal Closed":"Hod Portal Opened"}`);
            window.location.reload();
        }
    }

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
        setValue(response);
      }

      useEffect(()=>{
        getPermission();
      },[]);

    return (
        <>
            <form
                method="POST"
                className="text-center items-center mx-auto flex flex-col my-4"
                onSubmit={handleSubmit}
            >
                <h4 className="my-4">{value1.student_portal?"Uncheck":"Check"} To {value1.student_portal?"Open":"Close"} The Student Portal</h4>
                <input
                    type="checkbox"
                    name="student_portal"
                    className="mx-4 h-12 rounded-md w-1/4 p-4 text-center border"
                    value="Boat"
                    onChange = {onChange}
                />
                <h4 className="my-4">{value1.hod_portal?"Uncheck":"Check"} To {value1.hod_portal?"Open":"Close"} The HOD Portal</h4>
                <input
                    type="checkbox"
                    name="hod_portal"
                    className="mx-4 h-12 rounded-md w-1/4 p-4 text-center border"
                    onChange = {onChange}
                />
                <button className="my-6 hover:bg-yellow-200 px-4 py-3 border-black border-2 rounded-3xl " type="submit" value="Set Date">Set Permission</button>
            </form>
        </>
    )
}



