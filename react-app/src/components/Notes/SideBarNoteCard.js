import { useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { getSingleNote, deleteNote } from "../../store/notes";

function SideBarNoteCard({ note, fromNotebook, notebook }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [deleteClass, setDeleteClass] = useState("sbnc-delete-div-hidden")

  function newNoteClick(e) {
    e.preventDefault();
    dispatch(getSingleNote(note.id))
    if (fromNotebook) {
      history.push(`/notebooks/${notebook.id}/notes/${note.id}`)
    } else {
      history.push(`/notes/${note.id}`);
    }
  }
  const deleteNoteEvent = () => {
    dispatch(deleteNote(note.id))
    history.push(`/home`)
  }
  const triggerDeleteDiv = () => {
    if (deleteClass === "sbnc-delete-div-hidden") {
      setDeleteClass("sbnc-delete-div-active");
    } else {
      setDeleteClass("sbnc-delete-div-hidden")
    }
  }

  return (
    <div onClick={newNoteClick}
    className="sidebarnotecard-wrapper"
    onMouseEnter={triggerDeleteDiv}
    onMouseLeave={triggerDeleteDiv}>
      <div className="sbnc-header">
      <div className="sbnc-title">
        {note.title}
      </div>
      <div className={deleteClass}>
        <button className="sbnc-delete-button" onClick={deleteNoteEvent}><i class="fa-solid fa-x"></i></button>
      </div>
      </div>
      <div className="sbnc-created-at">
        {note.created_at}
      </div>
    </div>
  )
}

export default SideBarNoteCard