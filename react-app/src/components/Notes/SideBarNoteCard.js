import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { getSingleNote } from "../../store/notes";

function SideBarNoteCard({ note }) {
  const dispatch = useDispatch();
  const history = useHistory();
  function newNoteClick(e) {
    e.preventDefault();
    dispatch(getSingleNote(note.id))
    history.push(`/notes/${note.id}`);
  }

  return (
    <div onClick={newNoteClick} className="sidebarnotecard-wrapper">
      <div className="sbnc-title">
        {note.title}
      </div>
      <div className="sbnc-created-at">
        {note.created_at}
      </div>
    </div>
  )
}

export default SideBarNoteCard