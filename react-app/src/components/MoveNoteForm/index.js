import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getNotebooks, updateNotebook } from "../../store/notebooks";
import { editNote } from "../../store/notes";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import './MoveNoteForm.css';

function MoveNoteForm({ note }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const notebooks = Object.values(useSelector(state => state.notebook));
  const currentNotebook = notebooks.filter(notebook => note.notebook?.id === notebook.id)[0];
  const [selectedNotebook, setSelectedNotebook] = useState(currentNotebook);

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch])

  const addToNotebook = () => {
    note.notebook_id = selectedNotebook.id
    dispatch(updateNotebook(selectedNotebook))
    dispatch(editNote(note.id, note))
    history.push(`/notebooks/${selectedNotebook.id}`)
    dispatch(getNotebooks());
    closeModal();
  }

  if (currentNotebook === undefined) {
    return (
      <div className="move-note-wrapper">
      <div className="move-note-header">
        <div className="move-note-title">
          Move note to...
        </div>
        <div className="move-note-close-div">
          <button className="move-note-close" onClick={closeModal}>
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
      <div className="move-note-notebook-list">
        {notebooks.map(notebook => (
            <div key={notebook.id} className={notebook.id === selectedNotebook?.id ? `move-note-notebook-item-selected`: `move-note-notebook-item`}
            onClick={(e) => setSelectedNotebook(notebook)}>
              {notebook.title}
            </div>
          ))}
      </div>
      <div className="move-notebook-footer">
        <button className="new-notebook-cancel"
        onClick={closeModal}
        >Cancel</button>
        <button className="new-notebook-create"
        onClick={addToNotebook}
        >Done</button>
      </div>
    </div>
    )
  }

  const moveNote = () => {
    note.notebook_id = selectedNotebook.id;
    const index = currentNotebook.notes.indexOf(note)
    currentNotebook.notes.splice(index, 1);
    dispatch(updateNotebook(selectedNotebook))
    dispatch(updateNotebook(currentNotebook))
    dispatch(editNote(note.id, note))
    history.push(`/notebooks/${selectedNotebook.id}`);
    closeModal();
  }

  if (notebooks.length === 0) return null;

  return (
    <div className="move-note-wrapper">
      <div className="move-note-header">
        <div className="move-note-title">
          Move note to...
        </div>
        <div className="move-note-close-div">
          <button className="move-note-close" onClick={closeModal}>X</button>
        </div>
      </div>
      <div className="move-note-notebook-list">
        {notebooks.map(notebook => (
          notebook.id === selectedNotebook.id ? (
            <div key={notebook.id} className="move-note-selected-notebook">
              {notebook.title}
            </div>
          ) : (
            <div key={notebook.id} className="move-note-notebook-item"
            onClick={(e) => setSelectedNotebook(notebook)}>
              {notebook.title}
            </div>
          )))}
      </div>
      <div className="move-notebook-footer">
        <button className="move-note-cancel-button"
        onClick={closeModal}
        >Cancel</button>
        <button className="move-note-submit-button"
        onClick={moveNote}
        >Done</button>
      </div>
    </div>
  )
}

export default MoveNoteForm;