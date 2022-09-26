import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Update from "./components/Update";
import axios from "axios";
import "./app.css";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

function App() {
  // var lUser = JSON.parse(localStorage.getItem("Luser"));
  const [user, setUser] = useState([]);
  const [logged, setLogged] = useState({});
  const url = "http://localhost:3001/";
  useEffect(() => {
    axios.get(url).then((res) => {
      setUser(res.data);
    });
  }, [useParams]);
  console.log("from app:" + logged.email);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Register userData={user} />} />
        <Route
          path="login"
          element={<Login logged={logged} setLogged={setLogged} />}
        />
        {/* <Route
          path="home"
          element={
            <ProtectedRoute user={user}>
              <Home logged={logged.email} user={user} />
              <Update user={user} />
            </ProtectedRoute>
          }
        /> */}

        <Route path="home" element={<Home logged={logged.email} />} />
        <Route
          path="update"
          element={<Update userData={user} logged={logged.email} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
