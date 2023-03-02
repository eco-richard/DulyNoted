import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateNotebook } from "../../store/notebooks";

import './EditNotebookModal.css'
function EditNotebookModal({ notebook }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState(notebook.title);

  const handleSubmit = async () => {
    const notebookData = {...notebook};
    const date = new Date().toISOString();
    notebookData.updated_at = date;
    notebookData.title = title;
    dispatch(updateNotebook(notebookData));
    closeModal();
  }

  return (
    <div className="edit-notebook-modal-wrapper">
      <div className="edit-notebook-modal-header">
        Rename Notebook
        <button onClick={closeModal}><i class="fa-solid fa-x"></i></button>
      </div>
      <div className="edit-notebook-modal-input-div">
        <label>
          Name:
        </label>
          <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
      </div>
      <div className="edit-notebook-modal-submit">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default EditNotebookModal;