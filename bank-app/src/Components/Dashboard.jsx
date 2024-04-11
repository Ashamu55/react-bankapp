import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:5000/student/dashboard";
        const token = localStorage.getItem('token');
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
            Accept: "application/json"
          }
        });
        // console.log(response.data.status);
        if (response.data.status ===  true) {
            console.log(response);
          console.log("User data fetched successfully");
          setUser(response.data.user);
        } else {
            localStorage.removeItem('token');
            navigate("/sigin");
            console.log("User not authenticated");
        }
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {users && (
        <div>
          <h2>Welcome, {users.firstName} {users.lastName}</h2>
          <p>Email: {users.email}</p>
          {/* Render other user data as needed */}
        </div>
      )}
    </>
  );
};

export default Dashboard;
