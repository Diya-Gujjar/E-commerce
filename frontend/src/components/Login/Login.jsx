import { useState } from "react";
import "./Login.css";
import Header from "../Header/Header";
import ShortLink from "../ShortLink/ShortLink";
import axios from "axios";

function Login({ setIsLogged }) {
  const [mobileEmail, setMobileEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [pswdclicked, setPswdClicked] = useState(false);
  const [mobileEmailError, setMobileEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleMouseClick = () => setClicked(true);
  const handleMouseRemove = () => setClicked(false);

  const handlePswdClick = () => setPswdClicked(true);
  const handlePswdRemove = () => setPswdClicked(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMobileEmailError("");
    setPasswordError("");

    if (!mobileEmail) {
      setMobileEmailError("This field is required.");
      return;
    }

    const isMobile = /^\d{10}$/.test(mobileEmail);
    const isEmail = /\S+@\S+\.\S+/.test(mobileEmail);
    const isValid = isMobile || isEmail;

    if (!isValid) {
      setMobileEmailError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!showPasswordField) {
      setShowPasswordField(true);
      return;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          mobile: mobileEmail,
          password: password,
        }
      );

      if (response.data.message === "Login successful") {
        alert("Login successful!");
        setIsLogged(true);

        const token = response.data.token;
        const userId = response.data.userId;

        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userId", userId);

        window.location.href = "/";
      } else {
        setPasswordError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg =
        err.response?.data?.message || "Login failed. Please try again.";
      setPasswordError(msg);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "52px" }} />
      <ShortLink />
      <div className="login-container">
        <div className="left-login">
          <h1>Login</h1>
          <p style={{ paddingTop: "15px" }}>
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>

        <div className="right-login">
          <form onSubmit={handleLoginSubmit}>
            <div style={{ minHeight: "130px" }}>
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
                  value={mobileEmail}
                  onClick={handleMouseClick}
                  onBlur={handleMouseRemove}
                  onChange={(e) => setMobileEmail(e.target.value)}
                  className={mobileEmailError ? "error-input" : ""}
                />
                {mobileEmailError && (
                  <div className="error-message">{mobileEmailError}</div>
                )}
              </div>

              {showPasswordField && (
                <div className="inpt">
                  {pswdclicked && (
                    <label htmlFor="password" className="login-label">
                      Enter Password
                    </label>
                  )}
                  <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onClick={handlePswdClick}
                    onBlur={handlePswdRemove}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError ? "error-input" : ""}
                  />
                  {passwordError && (
                    <div className="error-message">{passwordError}</div>
                  )}
                </div>
              )}
            </div>

            <div className="term-policy">
              By continuing, you agree to Our
              <a href="/terms"> Terms of Use</a> and
              <a href="/policies"> Privacy Policy</a>.
            </div>

            <button className="req-login-otp" type="submit">
              {showPasswordField ? "Submit" : "Enter Password"}
            </button>

            <div className="register-lnk">
              <a href="/register">New? Create an Account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
