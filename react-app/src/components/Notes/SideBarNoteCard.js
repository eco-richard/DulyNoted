import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { getSingleNote, deleteNote } from "../../store/notes";

function SideBarNoteCard({ note, fromNotebook, notebook }) {
  const dispatch = useDispatch();
  const history = useHistory();
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

  return (
    <div onClick={newNoteClick} className="sidebarnotecard-wrapper">
      <div className="sbnc-header">
      <div className="sbnc-title">
        {note.title}
      </div>
      <div className="sbnc-delete-div">
        <button className="sbnc-delete-button" onClick={deleteNoteEvent}>X</button>
      </div>
      </div>
      <div className="sbnc-created-at">
        {note.created_at}
      </div>
    </div>
  )
}

export default SideBarNoteCard