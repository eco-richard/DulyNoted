import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getNotebooks, updateNotebook } from "../../store/notebooks";
import { editNote } from "../../store/notes";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

function MoveNoteForm({ note }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const notebooks = Object.values(useSelector(state => state.notebook));
  const currentNotebook = notebooks.filter(notebook => note.notebook.id === notebook.id)[0];
  const [selectedNotebook, setSelectedNotebook] = useState(currentNotebook);

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch])

  const moveNote = () => {
    note.notebook = selectedNotebook;
    const index = currentNotebook.notes.indexOf(note)
    currentNotebook.notes.splice(index, 1);
    selectedNotebook.notes.push(note)
    dispatch(updateNotebook(selectedNotebook.id, selectedNotebook))
    // dispatch(updateNotebook(currentNotebook))
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
            <div className="move-note-selected-notebook">
              {notebook.title}
            </div>
          ) : (
            <div className="move-note-notebook-item"
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