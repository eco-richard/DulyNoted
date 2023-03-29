import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleNote, editNote } from "../../store/notes";
import { EditorState, convertFromRaw, convertToRaw, ContentState } from "draft-js";
import OpenModalButton from '../OpenModalButton';
import MoveNoteForm from "../MoveNoteForm";
// import RichEditorExample from "../RichEditor";
// import Editor from "../Editor";
import ReactMarkdown from "react-markdown";

import './NoteBody.css'
import { getNotebooks } from "../../store/notebooks";

function NoteBody({ note }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [title, setTitle] = useState(note?.title || "");
  const [isEditable, setIsEditable] = useState(false);

  let noteBody;
  if (note?.body === null) {
    noteBody = "";
  } else {
    noteBody = note?.body;
  }
  const [body, setBody] = useState(noteBody);
  const [editorState, setEditorState] = useState(() => {
    if (noteBody) {
      const contentBody = ContentState.createFromText(noteBody)
      return EditorState.createWithContent(contentBody);
    }
    return EditorState.createEmpty()
  });

  useEffect(() => {
    if (note.id !== params.noteId) {
      dispatch(getSingleNote(params.noteId));
      setIsEditable(false);
    }
    // dispatch(getSingleNote(note.id));
  }, [dispatch, note?.id])

  useEffect(() => {
    setTitle(note.title);
    setBody(note.body || "");
  }, [note]);

  let noteStyle;
  const updateNote = async () => {
    const date = new Date().toISOString().slice(0, 10);
    const newBody = editorState?.getCurrentContent().getPlainText();
    // noteStyle = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    await dispatch(editNote(note.id, {
      title,
      body,
      notebook_id: note?.notebook?.id || null,
      updated_at: date
    }))
    dispatch(getSingleNote(note.id))
    dispatch(getNotebooks());
  }

  const handleClick = (e) => {
    if (e.detail === 2) {
      setIsEditable(!isEditable);
    }
  }

  const editComponent = isEditable ? (
    <textarea
      className="notebody-body"
      value={body}
      onClick={(e) => handleClick(e)}
      onChange={e => setBody(e.target.value)}
      onBlur={updateNote}
      placeholder="No rush, just jot something down"
    />
  ) : (
    <ReactMarkdown>{note.body}</ReactMarkdown>
  )

  useEffect(() => {
    if (isEditable === false) {
      updateNote();
    }
  }, [isEditable]);

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
        <div className="notebody-body-div"
        onClick={(e) => handleClick(e)}>
        {editComponent}
        </div>
      </div>
      <div className="note-tags-div">
        Tags:
        {note.tags.map(tag => (
          <div className="note-single-tag"
          style={{backgroundColor: tag.color}}>
            {tag.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NoteBody;