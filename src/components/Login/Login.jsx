import React, { useState } from "react";
import "./Login.css";
import RegisterLoginHeader from "../Register-login-header/Register-login-header";
import ShortLink from "../ShortLink/ShortLink";

function Login({ setIsLogged }) {
  const [mobileEmail, setMobileEmail] = useState("");
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!mobileEmail) {
      setError("This field is required.");
      return;
    }
    if (!/\S+@\S+\.\S+|\d{10}/.test(mobileEmail)) {
      setError("Please enter a valid email or mobile number.");
      return;
    }
    setIsLogged(true);
    console.log("Signed In");
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
        <div className="left-login">
          <h1>Login</h1>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
        </div>

        <div className="right-login">
          <form onSubmit={handleLoginSubmit}>
            <div className="inpt">
              {clicked && (
                <label htmlFor="mobileNo" className="login-label">
                  Enter Email/Mobile number
                </label>
              )}
              <input
                name="mobileNo"
                id="signinNo"
                placeholder="Enter Email/Mobile number"
                value={mobileEmail}
                onClick={handleMouseClick}
                onBlur={handleMouseRemove}
                onChange={(e) => setMobileEmail(e.target.value)}
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
              Request OTP
            </button>

            <div className="register-lnk">
              <a href="/register">New to Flipkart? Create an Account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
