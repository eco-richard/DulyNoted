import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

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
			<div className="signup-form-div">
			<form onSubmit={handleSubmit}>
				<ul className="errors-list">
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
				<label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm Password"
					/>
				</label>
				<div className="buttons-div">
				<button type="submit" className="login-button">Sign Up</button>
				</div>
			</form>
			</div>
			<div className="no-account-signup-div">
				<div className="no-account-text">
					Already have an account?
				</div>
				<div className="no-account-create">
					<OpenModalButton
					modalComponent={<LoginFormModal />}
					buttonText="Sign in"
					/>
				</div>
			</div>
		</div>
	);
}

export default SignupFormModal;