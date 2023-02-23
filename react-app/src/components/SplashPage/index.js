import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import './SplashPage.css'

function SplashPage() {
  return (
    <div className="splash-page-wrapper">
      <div className="splash-page-top-bar">
        <div className="splash-page-logo">

        </div>
        <div className="splash-login-button-wrapper">
          <OpenModalButton
          className="splash-login-button"
          modalComponent={<LoginFormModal />}
          buttonText="Log In"
          />
        </div>
      </div>
      <div className="splash-page-info">
        <div className="splash-page-info-header">
          <h1>Tame your work organize your life</h1>
        </div>
        <div className="splash-info-text">
          <p>Remember everything and tackle any project with your notes, tasks, and schedule all in one place</p>
        </div>
        <div className="splash-page-info-user-wrapper">
          <div className="splash-page-info-signup">
            <OpenModalButton
            className="splash-info-signup-button"
            modalComponent={<SignupFormModal/>}
            buttonText="Sign up for free"
            />
          </div>
          <div className="splash-info-login">
            <OpenModalButton
            className="splash-info-login-button"
            modalComponent={<LoginFormModal />}
            buttonText="Already have an account? Log in"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplashPage;