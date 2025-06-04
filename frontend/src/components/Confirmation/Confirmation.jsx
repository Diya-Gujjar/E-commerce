import "./Confirmation.css";

function Confirmation({ userData, onConfirm, onChangeAddress }) {
  return (
    <div className="confirmation-container">
      <h2 className="confirmation-title">Confirm Your Details</h2>

      <div className="confirmation-info">
        <p>
          <strong>Name:</strong> {userData.name}
        </p>
        <p>
          <strong>Contact:</strong> {userData.mobile}
        </p>
        <p>
          <strong>Address:</strong>
          {`${userData.address.city}, ${userData.address.state}, ${userData.address.pinCode}, ${userData.address.country}`}
        </p>
      </div>

      <div className="confirmation-actions">
        <button onClick={onConfirm} className="confirm-btn">
          Confirm and Pay
        </button>
        <button onClick={onChangeAddress} className="edit-btn">
          Edit Address
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
