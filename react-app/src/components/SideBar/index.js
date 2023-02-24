import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { createNote, getSingleNote } from "../../store/notes";

function SideBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const createNewNote = async () => {
    const date = new Date().toISOString().slice(0, 10);
    const note = await dispatch(createNote({
      title: "Untitled",
      body: " ",
      created_at: date,
      updated_at: date
    }))
    console.log("NOTE FROM CREATE:", note);
    dispatch(getSingleNote(note));
    history.push(`/notes/${note.id}`);
  }
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
        <button className="sidebar-new-note-button"
        onClick={createNewNote}>+ New</button>
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