import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteNotebook } from "../../store/notebooks";

import './DeleteNotebookModal.css';

function DeleteNotebookModal({ notebook }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const confirmDelete = async () => {
    const [_, response] = await dispatch(deleteNotebook(notebook.id));
    if (response === 200) {
      history.push(`/home`);
      closeModal();
    }
  }
  return (
    <div className="delete-notebook-modal-wrapper">
      <div className="delete-notebook-modal-header">
        Delete Notebook
      </div>
      <div className="delete-notebook-info">
        Are you sure you want to delete this notebook? All notes associated with this will be deleted aswell.
      </div>
      <div className="delete-notebook-buttons">
        <button className="new-notebook-cancel"
        onClick={closeModal}>Cancel</button>
        <button className="new-notebook-create"
        onClick={confirmDelete}>Delete</button>
      </div>
    </div>
  );
}

export default DeleteNotebookModal;