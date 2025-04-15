import React, { useState } from "react";
import "./Register.css";
import Header from "../Header/Header";
import ShortLink from "../ShortLink/ShortLink";
import axios from "axios";

function Register() {
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleContinue = (e) => {
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

    setShowForm(true);
  };

  const handleMouseClick = () => {
    setClicked(true);
  };

  const handleMouseRemove = () => {
    setClicked(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    const userData = {
      mobile,
      username,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        userData
      );

      if (response.data.success) {
        console.log("User registered successfully!");
      }
    } catch (err) {
      console.error("Error occurred while registering:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "52px" }} />
      <ShortLink />
      <div className="login-container">
        {/* Left Register Section */}
        <div className="left-login">
          <div>
            <h1>Looks like you're new here!</h1>
          </div>
          <div style={{ paddingTop: "20px" }}>
            Sign up with your mobile number to get started
          </div>
        </div>

        {/* Right Register Section */}
        <div className="right-login">
          {!showForm ? (
            <form onSubmit={handleContinue}>
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
                <a href="/login">Existing User? Log in</a>
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="inpt">
                <label htmlFor="username" className="login-label">
                  Username
                </label>
                <input
                  name="username"
                  id="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={error ? "error-input" : ""}
                />
              </div>

              <div className="inpt">
                <label
                  htmlFor="password"
                  className="login-label"
                  style={{ paddingTop: "5px" }}
                >
                  Password
                </label>
                <input
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error ? "error-input" : ""}
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button className="req-login-otp" type="submit">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
