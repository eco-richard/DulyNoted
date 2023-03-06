import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../SideBar";
import NoteCard from "./NoteCard";
import ScratchPad from "../ScratchPad";

import './HomePage.css'
import { getAllNotes } from "../../store/notes";
function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const notes = Object.values(useSelector(state => state.note.allNotes))?.slice(0, 4);
  const [notesLoaded, setNotesLoaded] = useState(false);
  const BACKGROUND_IMAGE_URL = "https://www.timeoutabudhabi.com/public/images/2020/06/24/Cafe-302.jpg";

  console.log("USER: ", user);
  useEffect(() => {
    dispatch(getAllNotes())
    setNotesLoaded(true);
  }, [dispatch])

  if (!notesLoaded) return null;

  return (
    <div className="max-container">
    <SideBar/>
    <div className="home-main-wrapper">
      <div className="home-background-div">
        <img className="home-background-img"
        src={BACKGROUND_IMAGE_URL}
        alt="" />
      </div>
      <div className="home-notes-div">
        <div className="home-notes-title">
          NOTES
        </div>
        <div className="home-notes-container">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
      <div className="scratch-pad-div">
        <ScratchPad />
      </div>
    </div>
    </div>
  );
}

export default HomePage