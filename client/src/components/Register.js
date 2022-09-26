import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";

function Register({ userData }) {
  const url = "http://localhost:3001/";
  const navigate = useNavigate();

  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [resdata, setResData] = useState({});
  const [formerrors, setFormErrors] = useState({});
  const [httperrors, setHttpErros] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user });

    setFormErrors(validate(user));

    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formerrors).length === 0 && isSubmit) {
      axios
        .post(url, {
          email: user.email,
          userName: user.userName,
          password: user.password,
        })
        .then((res) => setFormErrors(validate(res.data)));
      navigate("/login");
      navigate(0);
    }
  }, [formerrors]);

  const validate = (values) => {
    const nameRegx = /^[a-zA-Z0-9_]{3,16}$/;
    const emialRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegx = /^.{6,}$/;
    const errors = {};
    userData.forEach(function (myuser) {
      if (myuser.email === user.email) {
        errors.nonUniq = "Email already exits ";
      }
    });

    if (!values.userName) {
      errors.userName = "user name is required";
    }
    if (!values.userName.match(nameRegx)) {
      errors.usernameError = "please enter valid user name";
    }
    if (!values.email.match(emialRegx)) {
      errors.emailformat = "please enter valid email ";
    }

    if (!values.email) {
      errors.email = "email is required";
    }

    if (!values.password) {
      errors.password = "password is required";
    }
    if (!values.password.match(passwordRegx)) {
      errors.passwordEx = "password should be minimum 6 characters ";
    }
    return errors;
  };
  return (
    <div className="register">
      <h2 className="text-center"> Register your account</h2>

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

          {/* email */}
          <div className="form-outline mb-4">
            <label className="form-label">Email address</label>
            <input
              type="text"
              id="email"
              value={user.email}
              className="form-control"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <p className="warning">
              {formerrors.email || formerrors.emailformat || formerrors.nonUniq}
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
          <button className="btn btn-primary btn-block mb-4">Register</button>
          {/* Sign up */}
          <div className="text-center">
            <p>
              Already have an account?
              <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
