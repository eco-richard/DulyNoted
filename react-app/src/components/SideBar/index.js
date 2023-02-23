import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function SideBar() {
  const user = useSelector(state => state.session.user);

  console.log("User:", user);
  return (
    <nav className="sidebar">
    <div className="sidebar-wrapper">
      <div className="sidebar-email">
        <div className="sidebar-email-image-div">

        </div>
        <p>{user.email}</p>
      </div>
      <div className="sidebar-new-note">
        <button className="sidebar-new-note-button">+ New</button>
      </div>
      <div className="sidebar-links">
        <div className="sidebar-home">
          <NavLink exact to="/home">Home</NavLink>
        </div>
        <div className="sidebar-notes">
          <NavLink exact to='/new-note'>Notes</NavLink>
        </div>
        <div className="sidebar-notebooks">
          <NavLink exact to='/notebooks'>Notebooks</NavLink>
        </div>
      </div>
    </div>
    </nav>
  );
}

export default SideBar