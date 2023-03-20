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
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(note.id))
      history.push(`/home`)
    }
  }

  return (
    <div onClick={newNoteClick}
    className="sidebarnotecard-wrapper"
    onMouseEnter={() => setDeleteClass("sbnc-delete-div-active")}
    onMouseLeave={() => setDeleteClass("sbnc-delete-div-hidden")}>
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