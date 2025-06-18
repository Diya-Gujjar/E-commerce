import { useState } from "react";
import "./RegisterSeller.css";
import Header from "../Header/Header";
import axios from "axios";

function RegisterAdmin() {
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gstIn, setGstIn] = useState("");
  const [clicked, setClicked] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [mobileError, setMobileError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [gstInError, setGstInError] = useState("");

  const handleMouseClick = () => setClicked(true);
  const handleMouseRemove = () => setClicked(false);

  const handleContinue = (e) => {
    e.preventDefault();
    setMobileError("");

    if (!mobile) {
      setMobileError("This field is required.");
      return;
    }

    const isMobile = /^\d{10}$/.test(mobile);
    const isEmail = /\S+@\S+\.\S+/.test(mobile);
    const isValid = isMobile || isEmail;

    if (!isValid) {
      setMobileError("Please enter a valid 10-digit mobile number or email.");
      return;
    }

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");
    setGstInError("");

    if (!username || username.trim().length < 3) {
      setUsernameError("Username must be at least 3 characters.");
      return;
    }

    if (!password) {
      setPasswordError("Password is required.");
      return;
    }

    const passwordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(
      password
    );
    if (!passwordValid) {
      setPasswordError(
        "Password must be of at least 6 char, include both letters & numbers only."
      );
      return;
    }

    if (!gstIn) {
      setGstInError("GST IN is required to sell product.");
      return;
    }
    const userData = {
      mobile,
      name: username,
      password,
      gstIn,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/registerSeller",
        userData
      );
      if (
        response.data.message === "User upgraded to Seller successfully" ||
        "Seller registered successfully"
      ) {
        const userId = response.data.user._id;
        if (userId) {
          sessionStorage.setItem("userId", userId);
          alert("User registered successfully!");
          window.location.href = "/seller";
        } else {
          console.error("User ID is missing in the response.");
        }
      }
    } catch (err) {
      console.error("Error occurred while registering:", err);
      const msg =
        err.response?.data?.message || "Registration failed. Please try again.";
      setGstInError(msg);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "60px" }} />
      <div className="login-container">
        {/* Left Register Section */}
        <div className="left-login">
          <h1>Looks like you're ready to Sell product!</h1>
          <p style={{ paddingTop: "20px" }}>
            Sign up with your mobile number to get started
          </p>
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
                <div style={{ minHeight: "60px" }}>
                  <input
                    name="mobileNo"
                    id="signinNo"
                    placeholder="Enter Mobile number"
                    value={mobile}
                    onClick={handleMouseClick}
                    onBlur={handleMouseRemove}
                    onChange={(e) => setMobile(e.target.value)}
                    className={mobileError ? "error-input" : ""}
                  />
                  {mobileError && (
                    <div className="error-message">{mobileError}</div>
                  )}
                </div>
              </div>

              <div className="term-policy">
                By continuing, you agree to Our
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
                <div style={{ minHeight: "50px" }}>
                  <input
                    name="username"
                    id="username"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={usernameError ? "error-input" : ""}
                  />
                  {usernameError && (
                    <div className="error-message">{usernameError}</div>
                  )}
                </div>
              </div>

              <div className="inpt">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <div style={{ minHeight: "50px" }}>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError ? "error-input" : ""}
                  />
                  {passwordError && (
                    <div className="error-message">{passwordError}</div>
                  )}
                </div>
              </div>

              <div className="inpt">
                <label htmlFor="gstIn" className="login-label">
                  Enter GSTIN
                </label>
                <div style={{ minHeight: "50px" }}>
                  <input
                    name="gstIn"
                    id="gstIn"
                    placeholder="Enter GSTIN"
                    value={gstIn}
                    onChange={(e) => setGstIn(e.target.value)}
                    className={gstInError ? "error-input" : ""}
                  />
                  {gstInError && (
                    <div className="error-message">{gstInError}</div>
                  )}
                </div>
              </div>

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

export default RegisterAdmin;
