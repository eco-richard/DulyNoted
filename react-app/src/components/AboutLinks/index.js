import { Link } from 'react-router-dom';
import githubLogo from '../../images/github-icon.png';
import linkedinLogo from '../../images/linked-in-icon.png'

import './AboutLinks.css'

function AboutLinks() {
  return (
    <div className="about-links-wrapper">
      <div className="about-links-title">
        Find me here:
      </div>
      <div className="about-links-links-wrapper">
        <a className="about-link" href="https://github.com/eco-richard" target="_blank" rel="noreferrer noopener">
          <img src={githubLogo} className="link-image" alt="github" />
        </a>
        <a className="about-link" href="https://www.linkedin.com/in/richard-diaz-209780234/" target="_blank" rel="noreferrer noopener">
          <img src={linkedinLogo} className="link-image" alt="linkedin" />
        </a>
      </div>
    </div>
  );
}

export default AboutLinks;