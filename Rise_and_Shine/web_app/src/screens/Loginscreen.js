import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userAction";
import Loading from "../components/Loading";
import Error from "../components/Error";
import validator from 'validator'
import { render } from "react-dom";


export default function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading, error } = loginstate;

  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Enter valid Email')
    }
  }

  const dispatch = useDispatch();
  //use information stored in cookies to fill up login form and send user to home screen
  useEffect(() => {
    if (localStorage.getItem("currentrUser")) {
      window.location.href = "/";
    }
  }, []);

  function login() {
    //get email and password and use login user method to login

    if (validator.isEmail(email)) {
      const user = { email, password };

      dispatch(loginUser(user));
    }

  }
  

return(
<div class="vh-100">
  <div class="container-fluid h-custom wallpaper">
    <div class="row d-flex justify-content-center align-items-center h-100">
      
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">


        <form>
          <div class="divider d-flex align-items-center my-4">
            <p class="text-center text-light fw-bold mx-5 mb-0 h3">Sign In </p>
            {loading && <Loading />}
          {error && <Error error="Invalid Credentials" />}
          </div>

          <div class="form-outline mb-4">
            <input type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter your registered email address" value={email}
              onChange={(e) => {
                validateEmail(e);
                setemail(e.target.value);
              }} />
          </div>

          <div class="form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter password" value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }} />
          </div>

          <div class="text-center text-lg-start pt-2">
            <button type="button" class="btn bg-dark btn-lg mt-1 pt-1" onClick={login} >Sign In</button>
            <p class="medium fw-bold mt-2 pt-1 text-light left">Don't have an account? <a href="/register"
                class="link-light">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-dark">
   
    <div class="text-white mb-3 mb-md-0">
      Copyright © 2022. All rights reserved.
    </div>
    <div>
      <a href="#!" class="text-white me-4">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="#!" class="text-white me-4">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="#!" class="text-white me-4">
        <i class="fab fa-google"></i>
      </a>
      <a href="#!" class="text-white">
        <i class="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>
</div>
);
}