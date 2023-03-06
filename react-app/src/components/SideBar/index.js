import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { createNote, getSingleNote } from "../../store/notes";
import { logout } from "../../store/session";

import './SideBar.css';

function SideBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const singleNote = useSelector(state => state.note.singleNote);
  const [dropdownClass, setDropDownClass] = useState("hidden");

  const createNewNote = async () => {
    const date = new Date().toISOString().slice(0, 10);
    const note = await dispatch(createNote({
      title: "Untitled",
      // body: ,
      created_at: date,
      updated_at: date
    }))
    dispatch(getSingleNote(note));
    history.push(`/notes/${note.id}`);
  }

  useEffect(() => {
    if (dropdownClass === "hidden") return;

    const closeMenu = (e) => {
        setDropDownClass("hidden");
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [dropdownClass])

  if (user === null) {
    return <Redirect to="/" />;
  }

  const triggerDropdown = () => {
    if (dropdownClass === "hidden") {
      setDropDownClass("active");
    } else if (dropdownClass === "active") {
      setDropDownClass("hidden");
    }
  }

  const logoutEvent = async () => {
    console.log("IN LOGOUT EVENT")
    localStorage.removeItem("scratch")
    await dispatch(logout());
    console.log("NOW REDIRECTING: ")
    history.push(`/`);
  }

  return (
    <nav className="sidebar">
    <div className="sidebar-wrapper">
      <div className="sidebar-email">
        <div className="sidebar-email-logo">
        <p><i className="fa-solid fa-user-pen"></i> {user.email}</p>
        </div>
        <div className="sidebar-dropdown-button">
          <button onClick={triggerDropdown}>...</button>
        </div>
        <div className={`sidebar-dropdown-wrapper-${dropdownClass}`}>
          <button onClick={logoutEvent}>Log Out</button>
        </div>
      </div>
      <div className="sidebar-new-note">
        <button className="sidebar-new-note-button"
        onClick={createNewNote}> <i className="fa-solid fa-plus"></i>  New</button>
      </div>
      <div className="sidebar-links">
        <div className="sidebar-home">
          <NavLink exact to="/home"> <i className="fa-solid fa-house-chimney"></i> Home</NavLink>
        </div>
        <div className="sidebar-notes">
          <NavLink exact to={`/notes/${singleNote.id}`}> <i className="fa-solid fa-note-sticky"></i> Notes</NavLink>
        </div>
        <div className="sidebar-notebooks">
          <NavLink exact to='/notebooks'> <i className="fa-solid fa-book"></i> Notebooks</NavLink>
        </div>
      </div>
    </div>
    </nav>
  );
}

export default SideBar