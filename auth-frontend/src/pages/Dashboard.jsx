import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setMessage("Welcome to the Dashboard!"))
      .catch(err => setMessage("Unauthorized. Please login."));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
