import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userAction";
import Loading from "../components/Loading";
import Success from "../components/Success";
import Error from "../components/Error";
import validator from "validator";

export default function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const registerstate = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = registerstate;
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    confirmPassword: ''
  })

  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState("");

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Enter valid Email");
    }
  };

  const handlePasswordChange = (evnt) => {
    setpassword(passwordInput.password)
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    const NewPasswordInput = { ...passwordInput, [passwordInputFieldName]: passwordInputValue }
    setPasswordInput(NewPasswordInput);

  }
  const handleValidation = (evnt) => {
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    //for password 
    if (passwordInputFieldName === 'password') {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
      } else if (!specialCharPassword) {
        errMsg = "At least one Special Characters";
      } else if (!minLengthPassword) {
        errMsg = "At least minumum 8 characters";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }
    // for confirm password
    if (passwordInputFieldName === "confirmPassword" || (passwordInputFieldName === "password" && passwordInput.confirmPassword.length > 0)) {

      if (passwordInput.confirmPassword !== passwordInput.password) {
        setConfirmPasswordError("Confirm password is not matched");
      } else {
        setConfirmPasswordError("");
      }

    }
  }

  function register() {
      //if current password and confirm passowrd fields are not matching display error message
      const user = {
        name,
        email,
        password
      };
      dispatch(registerUser(user)); //dispatch register user method to register new user
    
  }

  return (
    <div class="vh-100">
  <div class="container-fluid h-custom wallpaper">
    <div class="row d-flex justify-content-center align-items-center h-100">
      
    <div>
      <div className="row justify-content-center ">
        <div className="col-md-5 mt-5">
          {loading && <Loading />}
          {success && <Success success="User Registered Succesfully" />}
          {error && <Error error="Email already registered" />}
          <h2 className="text-center m-3" style={{ fontSize: "35px" }}>
            {" "}
            Register
          </h2>

          <div>
            <input
              required
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              required
              type="text"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => {
                validateEmail(e);
                setemail(e.target.value);
              }}
            />
            <span className="text-danger">{emailError}</span>

            <div className="row">
              <div>
                <div className="form-group my-3">
                  <input type="password" value={passwordInput.password} onChange={handlePasswordChange} onKeyUp={handleValidation} name="password" placeholder="Password" className="form-control" />
                  <p className="text-danger">{passwordError}</p>
                </div>


                <div className="form-group my-3">
                  <input type="password" value={passwordInput.confirmPassword} onChange={handlePasswordChange} onKeyUp={handleValidation} name="confirmPassword" placeholder="Re-enter password" className="form-control" />
                  <p className="text-danger">{confirmPasswordError}</p>
                </div>
              </div>
            </div>

            <button onClick={register} className="btn mt-3 register-button pl-5 bg-dark">
              {" "}
              REGISTER{" "}
            </button>
            <a className="btn login-button bg-dark" href="/login">
              {" "}
              Click Here to Login
            </a>
            
          </div>
        </div>
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
    </div>
  );
}
