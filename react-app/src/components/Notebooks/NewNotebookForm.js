import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { addNotebook, SUCCESS } from '../../store/notebooks';

import './NewNotebookForm.css';

function NewNotebookForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [createDisabled, setCreateDisabled] = useState(true);
    const { closeModal } = useModal();

    useEffect(() => {
        if (title !== "") {
            setCreateDisabled(false)
        } else {
            setCreateDisabled(true);
        }
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const notebookData = {
            title,
            created_at: new Date().toISOString().slice(0, 10),
            updated_at: new Date().toISOString().slice(0, 10)
        }
        const [notebook, response] = await dispatch(addNotebook(notebookData))
        if (response === SUCCESS) {
            closeModal();
            history.push(`/notebooks/${notebook.id}`);
        }
    }
    return (
        <div className="new-notebook-modal-wrapper">
            <div className="new-notebook-header">
                <div className='new-notebook-title'>
                    Create new notebook
                </div>
                <div className='new-notebook-close-out-button'
                onClick={closeModal}>
                    <button><i className="fa-solid fa-x"></i></button>
                </div>
            </div>
            <div className="new-notebook-info">
                Notebooks are useful for grouping notes around a common topic. They can be private or shared
            </div>
            <div className="new-notebook-input-wrapper">
                <label>
                    Name
                </label>
                <input
                className="new-notebook-input"
                placeholder="Notebook name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='new-notebook-footer'>
                <button className='new-notebook-cancel'
                onClick={closeModal}>
                    Cancel
                </button>
                 <button className='new-notebook-create'
                 onClick={handleSubmit}
                 disabled={createDisabled}>
                    Create
                </button>

            </div>
        </div>
    )
}

export default NewNotebookForm;

