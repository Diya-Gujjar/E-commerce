import React, { useState } from "react";
import "./Register.css";
import RegisterLoginHeader from "../Register-login-header/Register-login-header";
import ShortLink from "../ShortLink/ShortLink";

function Register() {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!mobile) {
      setError("This field is required.");
      return;
    }
    if (!/\S+@\S+\.\S+|\d{10}/.test(mobile)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    console.log("Registered In");
  };

  const handleMouseClick = () => {
    setClicked(true);
  };

  const handleMouseRemove = () => {
    setClicked(false);
  };

  return (
    <div>
      <RegisterLoginHeader />
      <ShortLink />
      <div className="login-container">
        {/* Left Login */}
        <div className="left-login">
          <div>
            <h1>Looks like you're new here!</h1>
          </div>
          <div>Sign up with your mobile number to get started</div>
        </div>

        {/* Right Login */}
        <div className="right-login">
          <form onSubmit={handleLoginSubmit}>
            <div className="inpt">
              {clicked && (
                <label htmlFor="mobileNo" className="login-label">
                  Enter Mobile number
                </label>
              )}
              <input
                name="mobileNo"
                id="signinNo"
                placeholder="Enter Mobile number"
                value={mobile}
                onClick={handleMouseClick}
                onBlur={handleMouseRemove}
                onChange={(e) => setMobile(e.target.value)}
                className={error ? "error-input" : ""}
              />
              {error && <div className="error-message">{error}</div>}
            </div>

            <div className="term-policy">
              By continuing, you agree to Flipkart's
              <a href="/terms"> Terms of Use</a> and
              <a href="/policies"> Privacy Policy</a>.
            </div>

            <button className="req-login-otp" type="submit">
              Continue
            </button>
            <button className="exist-user">
              <a href="/login">Existing User? Log in</a>{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
