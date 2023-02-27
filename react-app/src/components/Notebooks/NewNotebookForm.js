import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function NewNotebookForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [newNotebook, setNewNotebook] = useState("");
    const [createDisabled, setCreateDisabled] = useState(true);

    useEffect(() => {
        if (newNotebook !== "") {
            setCreateDisabled(false)
        }
    }, [newNotebook])

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="new-notebook-modal-wrapper">
            <div className="new-notebook-header">
                <div className='new-notebook-title'>
                    Create new notebook
                </div>
                <div className='new-notebook-close-out-button'>
                    <button>X</button>
                </div>
            </div>
            <div className="new-notebook-info">
                Notebooks are useful for grouping notes around a common topic. They can be private or shared
            </div>
            <div className="new-notebook-input-wrapper">
                <label>
                    Name:
                    <input
                    className="new-notebook-input"
                    placeholder="Notebook name"
                    value={newNotebook}
                    onChange={(e) => setNewNotebook(e.target.value)}
                    />
                </label>
            </div>
            <div className='new-notebook-footer'>
                <button className='new-notebook-cancel'>
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

