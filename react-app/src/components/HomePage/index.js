import SideBar from "../SideBar";

import './HomePage.css'
function HomePage() {
  const BACKGROUND_IMAGE_URL = "https://www.timeoutabudhabi.com/public/images/2020/06/24/Cafe-302.jpg";

  return (
    <div className="home-container">
    <SideBar/>
    <div className="home-main-wrapper">
      <div className="home-background-div">
        <img className="home-background-img"
        src={BACKGROUND_IMAGE_URL}
        alt="" />
      </div>
      <div className="home-notes-div">

      </div>
    </div>
    </div>
  );
}

export default HomePage