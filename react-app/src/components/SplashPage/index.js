import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import HomePage from "../HomePage";

import './SplashPage.css'

function SplashPage() {
  const user = useSelector(state => state.session.user);
  const history = useHistory();
  const splashImage = "https://evernote.com/c/assets/homepage-repackaging/task_hero_image@2x__en.png?2e28f0ff68efad3c"

  if (user !== null) {
    history.push(`/home`);
  }

  return (
    <div className="splash-page-wrapper">
      <div className="splash-page-top-bar">
        <div className="splash-page-logo">
        <i className="fa-solid fa-shrimp fa-2x"></i>
        &nbsp;
        DulyNoted
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
          <h1>Tame your work, organize your life</h1>
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
      <div className="splash-page-image">
        <div className="splash-page-image-container">
          <img className="splash-image"
          src={splashImage}
          alt="" />
        </div>
      </div>
    </div>
  )
}

export default SplashPage;