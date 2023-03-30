import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createTagThunk, getSingleTagThunk } from "../../store/tags";

import './CreateTagModal.css';

function CreateTagModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const note = useSelector(state => state.note.singleNote);
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("");
    const [createDisabled, setCreateDisabled] = useState(true);
    const { closeModal } = useModal();

    useEffect(() => {
      if (title !== "" && color !== "") {
        setCreateDisabled(false);
      } else {
        setCreateDisabled(true);
      }
    }, [title, color])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTag = {
            title,
            color
        }

        const [tag, returnCode] = await dispatch(createTagThunk(newTag));

        if (returnCode === 200) {
            dispatch(getSingleTagThunk(tag.id));
            closeModal();
            // history.push(`/notes`);
        }
    }

    return (
        <div className="create-tag-modal-wrapper">
            <div className="create-tag-modal-header">
                <div className="create-tag-modal-top-bar">
                <div className="create-tag-modal-title-div">
                Create a new tag!
                </div>
                <div className="create-tag-close-button">
                    <button onClick={closeModal}>X</button>
                </div>
                </div>
                <div className="create-tag-modal-description">
                    Tags let you add keywords to notes, making them easier to find and browse.
                </div>
            </div>
            <div className="create-tag-modal-body">
                <div className="create-tag-title-div">
                    <label>
                    Name:
                    </label>
                    <input
                    className="tag-modal-title-input"
                    value={title}
                    type="text"
                    required={true}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="create-tag-color-div">
                    <label>
                    Color:
                    </label>
                    <input
                    className="tag-modal-color-input"
                    value={color}
                    type="color"
                    required={true}
                    onChange={(e) => setColor(e.target.value)}
                    />
                </div>

            </div>
            <div className="new-notebook-footer">
                <button className="new-notebook-cancel"
                onClick={closeModal}>
                  Cancel
                </button>
                <button className="new-notebook-create"
                onClick={handleSubmit}
                >Create
                </button>
            </div>
        </div>
    );
}

export default CreateTagModal;