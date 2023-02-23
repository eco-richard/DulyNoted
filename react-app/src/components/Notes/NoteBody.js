import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleNote, editNote } from "../../store/notes";

function NoteBody({ note }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [title, setTitle] = useState(note.title)
  const [body, setBody] = useState(note.body)
  console.log("NOTEID: ", params.noteId);
  console.log("SINGLE NOTE: ", note);

  const date = new Date();
  const dateStr = date.toISOString();
  console.log("DATESTR: ", dateStr);
  useEffect(() => {
    if (note.id !== params.noteId) {
      dispatch(getSingleNote(params.noteId));
    }
  }, [dispatch, params.noteId, note.id])

  const updateNote = () => {
    console.log("RUNNING UPDATE");
    dispatch(editNote(note.id, {
      title,
      body,
    }))
  }

  return (
    <div className="notebody-wrapper">
      <textarea
      className="notebody-title"
      value={title}
      onChange={e => setTitle(e.target.value)}
      onMouseLeave={updateNote}
      />
      <textarea
      className="notebody-body"
      value={body}
      onChange={e => setBody(e.target.value)}
      onMouseLeave={updateNote}
      />
    </div>
  )
}

export default NoteBody;