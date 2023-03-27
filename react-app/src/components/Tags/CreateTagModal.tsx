import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createTagThunk } from "../../store/tags";
import { TagStructure } from './tags-interface';

function CreateTagModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("");
    const [createDisabled, setCreatedDisabled] = useState(true);
    const { closeModal } = useModal();

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const newTag = {
            title,
            color
        }
    }

    return (
        <div className="create-tag-modal-wrapper">
            <div className="create-tag-modal-header">
                <div className="create-tag-modal-title-div">
                Create a new tag!
                </div>
                <div className="create-tag-close-button">
                    <button onClick={closeModal}>X</button>
                </div>
            </div>
            <div className="create-tag-modal-body">
                <div className="create-tag-title-div">
                    Title:
                    <input
                    className="tag-modal-title-input"
                    value={title}
                    type="text"
                    required={true}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="create-tag-color-div">
                    Color:
                    <input
                    className="tag-modal-color-input"
                    value={color}
                    type="color"
                    required={true}
                    onChange={(e) => {
                        console.log("COLOR: ", color);
                        setColor(e.target.value);
                    }
                    }
                    />
                </div>

            </div>
        </div>
    );
}

export default CreateTagModal;