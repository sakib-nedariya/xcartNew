import { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { RiLogoutBoxRLine } from "react-icons/ri";

const LogoutModal = ({ onCancel, onLogout }) => {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomCaptcha = Math.floor(1000 + Math.random() * 9000).toString(); 
    setCaptcha(randomCaptcha);
    setUserInput("");
    setError(""); 
  };

  const handleCaptchaChange = (e) => {
    setUserInput(e.target.value);
    setError("");
  };

  const handleLogout = () => {
    if (userInput === captcha) {
      onLogout();
    } else {
      setError("Incorrect CAPTCHA value. Please try again.");
    }
  };

  return (
    <div className="delete-modal-container">
      <div className="modal">
        <h6>Logout</h6>
        <div>
          <label htmlFor="captcha">
            If you want logout, enter <strong>"{captcha}"</strong>
          </label>
          <input
            type="text"
            id="captcha"
            name="captcha"
            placeholder="Enter captcha code..."
            value={userInput}
            onChange={handleCaptchaChange}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        <div className="modal-container-buttons">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            <HiXMark /> Cancel
          </button>
          <button type="button" className="delete-btn" onClick={handleLogout}>
            <RiLogoutBoxRLine /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
