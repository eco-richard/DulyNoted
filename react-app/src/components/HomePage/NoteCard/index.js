import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSingleNote } from "../../../store/notes";
import './NoteCard.css'

function NoteCard({ note }) {
  // const dispatch = useSelector(state => state.note.singleNote);
  const dispatch = useDispatch();
  const history = useHistory();

  const goToNote = () => {
    dispatch(getSingleNote(note.id));
    history.push(`/notes/${note.id}`)
  }

  const preview = note.body.slice(0, 47) + "...";
  return (
    <div className="home-note-card-wrapper"
    onClick={goToNote}>
      <div className="home-note-card-title">
        <h4>{note.title}</h4>
      </div>
      <div className="home-note-card-preview">
        {preview}
      </div>
    </div>
  )
}

export default NoteCard;