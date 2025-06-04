import { useState } from "react";
import axios from "axios";
import "./EnterAdress.css";

function EnterAddress({ onSubmit }) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("userId");
    try {
      await axios.put(
        `http://localhost:8000/api/user/address/${userId}`,
        {
          city,
          state,
          pinCode,
          country,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onSubmit();
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="address-container">
      <h2 className="address-title">Enter Your Address</h2>
      <form onSubmit={handleSubmit} className="address-form">
        <div className="input-group">
          <label htmlFor="city" className="input-label">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="state" className="input-label">
            State
          </label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="pinCode" className="input-label">
            Pin Code
          </label>
          <input
            type="text"
            id="pinCode"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="country" className="input-label">
            Country
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <button type="submit" className="save-btn">
          Save Address
        </button>
      </form>
    </div>
  );
}

export default EnterAddress;
