import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleNote, editNote } from "../../store/notes";

function NoteBody({ note }) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [title, setTitle] = useState(note?.title);
  const [body, setBody] = useState(note?.body);

  useEffect(() => {
    if (note.id !== params.noteId) {
      dispatch(getSingleNote(params.noteId));
    }
  }, [dispatch, params.noteId, note.id])

  useEffect(() => {
    setTitle(note.title);
    setBody(note.body);
  }, [note]);

  const updateNote = () => {
    const date = new Date().toISOString().slice(0, 10);
    dispatch(editNote(note.id, {
      title,
      body,
      updated_at: date
    }))
  }

  return (
    <div className="notebody-wrapper">
      <textarea
      className="notebody-title"
      value={title}
      onChange={e => setTitle(e.target.value)}
      onBlur={updateNote}
      />
      <textarea
      className="notebody-body"
      value={body}
      onChange={e => setBody(e.target.value)}
      onBlur={updateNote}
      />
    </div>
  )
}

export default NoteBody;