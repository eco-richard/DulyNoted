import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import "./LoginForm.css";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push("/home")
      closeModal()
    }
  };
  const loginDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"))
    if (data) {
      setErrors(data);
    } else {
      history.push(`/home`)
      closeModal();
    }
  }

  return (
    <div className="login-modal-wrapper">
      <div className="login-header-logo">
        <div className="login-logo">
          <i className="fa-solid fa-shrimp fa-5x"/>
        </div>
        <div className="login-title">
          DulyNoted
        </div>
        <div className="login-text">
          You aren't going to remember, just write it down.
        </div>
      </div>
      <div className="login-form-div">
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
        </ul>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            />
        </label>
        <div className="buttons-div">
        <button type="submit" className="login-button">Log In</button>
        <button type="button" className="demo-button" onClick={loginDemo}>Demo Login</button>
        </div>
      </form>
      </div>
      <div className="no-account-div">
        <div className="no-account-text">
          Don't have an account?
        </div>
        <div className="no-account-create">
          <OpenModalButton
          modalComponent={<SignupFormModal />}
          buttonText="Create account"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginFormModal;
