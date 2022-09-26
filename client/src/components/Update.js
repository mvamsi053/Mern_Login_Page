import React, { useState, useEffect } from "react";
import "../styles/register.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
var isLogged = localStorage.getItem("isLoggedIn");
function Update({ logged, userData }) {
  const url = "http://localhost:3001/update";
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [formerrors, setFormErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user });
    setFormErrors(validate(user));
    setIsSubmit(true);
  };
  const updateId = localStorage.getItem("ID");
  useEffect(() => {
    if (Object.keys(formerrors).length === 0 && isSubmit) {
      axios
        .put(url, {
          id: updateId,
          userName: user.userName,
          password: user.password,
        })
        .then((res) => setFormErrors(validate(res.data)));
      navigate("/login");
    }
  }, [formerrors]);
  const validate = (values) => {
    const nameRegx = /^[a-zA-Z0-9_]{3,16}$/;
    const passwordRegx = /^.{6,}$/;
    const emialRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const errors = {};
    if (!values.userName) {
      errors.userName = "user name is required";
    }
    if (!values.userName.match(nameRegx)) {
      errors.usernameError = "please enter valid user name";
    }

    if (!values.password) {
      errors.password = "password is required";
    }
    if (!values.password.match(passwordRegx)) {
      errors.passwordEx = "password should be minimum 6 characters ";
    }
    return errors;
  };
  {
    if (!localStorage.getItem("isLoggedIn") || !logged) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="register">
        <h2 className="text-center">New Credientials</h2>

        <div className="container">
          <form onSubmit={handleSubmit}>
            {/* User name */}
            <div className="form-outline mb-4">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={user.userName}
                id="username"
                className="form-control"
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
              />
              <p className="warning">
                {formerrors.userName || formerrors.usernameError}
              </p>
            </div>
            {/* password */}
            <div className="form-outline mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="form-control"
              />
              <p className="warning">
                {formerrors.password || formerrors.passwordEx}
              </p>
            </div>

            {/* Submit */}
            <button className="btn btn-primary btn-block mb-4">Update</button>
            {/* Sign up */}
            <div className="text-center">
              <p>
                I don't want to change?
                <Link to="/home">Back</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Update;
