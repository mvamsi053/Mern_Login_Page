import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
var loginUser = localStorage.getItem("isLoggedIn");
var lUser = {};
function Login({ logged, setLogged }) {
  const url = "http://localhost:3001/login";
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [httperrors, setHttpErrors] = useState({});
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [formerrors, setFormErrors] = useState({});
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
          password: user.password,
        })
        .then((res) => setHttpErrors(httpvalidate(res.data)));
    }
  }, [formerrors]);
  useEffect(() => {
    if (Object.keys(httperrors).length === 0 && isSubmit) {
      localStorage.setItem("Luser", JSON.stringify(user));
      lUser = JSON.parse(localStorage.getItem("Luser"));
      setLogged(lUser);
      console.log("from Login:" + logged.email);

      localStorage.setItem("isLoggedIn", true);

      navigate("/home");
    }
  }, [httperrors]);
  const httpvalidate = (resp) => {
    const httpRes = {};
    if (resp.status == 403) {
      httpRes.error1 = "password doesn't matched";
    }
    if (resp.status == 404) {
      httpRes.error2 = "user not found";
    }
    return httpRes;
  };
  const validate = (values) => {
    const emialRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegx = /^.{6,}$/;
    const errors = {};
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
      <h2 className="text-center">Login Page</h2>

      <div className="container">
        <form onSubmit={handleSubmit}>
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
              {formerrors.email || formerrors.emailformat || httperrors.error2}
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
              {formerrors.password ||
                httperrors.error1 ||
                formerrors.passwordEx}
            </p>
          </div>

          {/* Submit */}
          <button className="btn btn-primary btn-block mb-4">Login</button>
          {/* Sign up */}
          <div className="text-center">
            <p>
              I don't have account?
              <Link to="/">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
