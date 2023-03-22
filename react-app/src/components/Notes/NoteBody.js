import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleNote, editNote } from "../../store/notes";
import { EditorState, convertFromRaw, convertToRaw, ContentState } from "draft-js";
import OpenModalButton from '../OpenModalButton';
import MoveNoteForm from "../MoveNoteForm";
// import RichEditorExample from "../RichEditor";

import './NoteBody.css'
import { getNotebooks } from "../../store/notebooks";

function NoteBody({ note }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [title, setTitle] = useState(note.title || "");



  let noteBody;
  if (note.body === null) {
    noteBody = "";
  } else {
    noteBody = note.body;
  }
  console.log("NOTEBODY: ", noteBody);
  // console.log("NOTEBODY: ", noteBody);
  const [body, setBody] = useState(noteBody);
  const [editorState, setEditorState] = useState(() => {
    if (noteBody) {
      const contentBody = ContentState.createFromText(noteBody)
      console.log("CONTENT BODY:", contentBody)
      console.log(EditorState.createWithContent(contentBody))
      return EditorState.createWithContent(contentBody);
    }
    return EditorState.createEmpty()
  });

  useEffect(() => {
    if (note.id !== params.noteId) {
      dispatch(getSingleNote(params.noteId));
    }
    // dispatch(getSingleNote(note.id));
  }, [dispatch, note.id])

  useEffect(() => {
    setTitle(note.title);
    setBody(note.body || "");
  }, [note]);

  let noteStyle;
  const updateNote = async () => {
    const date = new Date().toISOString().slice(0, 10);
    // console.log("UPDATING");
    const newBody = editorState?.getCurrentContent().getPlainText();
    noteStyle = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    console.log("Body: ", newBody);
    await dispatch(editNote(note.id, {
      title,
      body,
      notebook_id: note?.notebook?.id || null,
      updated_at: date
    }))
    dispatch(getSingleNote(note.id))
    dispatch(getNotebooks());
  }

  return (
    <div className="notebody-wrapper">
      <div className="notebook-select-bar">
        <div className="note-notebook-title">
        {note.notebook === "" ? `No notebook` : note.notebook?.title}
        </div>
        <div className="change-notebook-button-div">
          <OpenModalButton
          modalComponent={<MoveNoteForm note={note}/>}
          className="change-notebook-button"
          buttonText={<i className="fa-solid fa-book-medical"></i>}
          />
        </div>
      </div>
      <div className="note-meat"
      onMouseLeave={updateNote}
      >
         <textarea
        className="notebody-title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onBlur={updateNote}
        placeholder="Title"
        />
        <textarea
        className="notebody-body"
        value={body}
        onChange={e => setBody(e.target.value)}
        onBlur={updateNote}
        placeholder="No rush, just jot something down"
        />
        {/* <div>
          <RichEditorExample
          editorState={editorState}
          onEditorStateChange={setEditorState}
          noteStyle={note.title}
          />
        </div> */}
      </div>
    </div>
  )
}

export default NoteBody;