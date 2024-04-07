import axios from 'axios'
// import React, { useEffect } from 'react'
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'

const Dashboard = () => {
let navigate = useNavigate()
const [userData, setUserData] = useState(null);

  useEffect(() => {
    let url = "http://localhost:5000/student/dashboard"
    let token = localStorage.getItem('token')
    axios
    .get(url,{
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
        Accept:"application/json"
      }
    })
    .then((res)=>{
        if(res.data.status === true){
          console.log("Success");
          setUserData(res.data.user); 
        }else{
          localStorage.removeItem('token')
          navigate("/sigin")
          console.log(res.status);
        }
    })
    .catch((error) => {
        console.error("Error occurred while fetching user data:", error);
        // Handle error if needed
      });
  }, [navigate])
  
  return (
    <>
         {userData && (
        <div>
          <h2>Welcome, {userData.firstName} {userData.lastName}</h2>
          <p>Email: {userData.email}</p>
          {/* Render other user data as needed */}
        </div>
      )}
    </>
  )
}

export default Dashboard