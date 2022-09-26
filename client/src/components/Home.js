import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";

import axios from "axios";
import "../styles/home.css";
var isLogged = localStorage.getItem("isLoggedIn");
console.log(isLogged);

function Home({ logged }) {
  const navigate = useNavigate();

  console.log("from Home:" + logged);
  const [userData, setUserData] = useState([]);

  const url = "http://localhost:3001/";
  useEffect(() => {
    axios.get(url).then((res) => {
      setUserData(res.data);
    });
  }, []);
  const handleUpdate = (id) => {
    localStorage.setItem("ID", id);
    navigate("/update");
  };
  function handleLogout(event) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("Luser");
    navigate("/login");
  }
  {
    if (!localStorage.getItem("isLoggedIn") || !logged) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="home">
        {userData.map(function (user) {
          if (user.email === logged) {
            return (
              <div className="jumbotron" key={user.email}>
                <h1 className="display-4"> Hello, {user.userName} ! </h1>
                <p className="lead">Your email id: {user.email}</p>
                <hr className="my-4"></hr>

                {/* <Link to="/update" className="btn btn-primary home-butns">
                Edit Credientials
              </Link> */}
                <button
                  className="btn btn-primary home-butns "
                  onClick={() => handleUpdate(user._id)}
                >
                  Edit Credientials
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={(e) => handleLogout(e)}
                >
                  Logout
                </button>

                {/* <Link to="/login" className="btn btn-outline-primary ">
                Logout
              </Link> */}
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default Home;
