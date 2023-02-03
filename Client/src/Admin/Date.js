import { useState } from "react";
import { REACT_APP_APIURL } from '../config'

export default function Date() {
    const[date,setDate] = useState({
        start:"",
        end:"",
    });
    const onChange = (event) => {
        setDate({
          ...date,
          [event.target.name]: event.target.value,
        });
      }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        var response = await fetch("${REACT_APP_APIURL}/api/leave/admin/date", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(date),
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          });
        if(response){
            window.alert("Date Set Successfully!!")
        }
    }
    return (
        <>
            <form
                method="POST"
                className="text-center items-center mx-auto flex flex-col my-4"
                onSubmit={handleSubmit}
            >
                <h4 className="my-4">Enter The Start Date:</h4>
                <input
                    type="text"
                    name="start"
                    required
                    className="mx-4 h-12 rounded-md w-1/4 p-4 text-center border"
                    placeholder="yyyy-mm-dd"
                    onChange = {onChange}
                    value = {date.start}
                />
                <h4 className="my-4">Enter The End Date:</h4>
                <input
                    type="text"
                    name="end"
                    required
                    className="mx-4 h-12 rounded-md w-1/4 p-4 text-center border"
                    placeholder="yyyy-mm-dd"
                    onChange = {onChange}
                    value = {date.end}
                />
                <button className="my-6 hover:bg-yellow-200 px-4 py-3 border-black border-2 rounded-3xl " type="submit" value="Set Date">Set Date</button>
            </form>
        </>
    )
}






