import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTagsThunk } from "../../store/tags";
import OpenModalButton from "../OpenModalButton";
import CreateTagModal from "./CreateTagModal";
import { TagStructure } from "./tags-interface"

import './Tags.css';

interface TagsProps {
    setOpenTags: any
}

function Tags(prop: TagsProps) {
    const dispatch = useDispatch();
    const tags: TagStructure[] = Object.values(useSelector((state: any) => state.tag.allTags));
    const [loaded, setLoaded] = useState(false);
    const [newTagLabel, setNewTagLabel] = useState(false);
    console.log("TAGS: ", tags);

    useEffect(() => {
        dispatch(getAllTagsThunk());
        setLoaded(true);
    }, [dispatch])

    if (!loaded) return null;
    tags.sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    })
    return (
        <div className="tags-wrapper">
            <div className="tags-header">
                <div className="tags-title">
                    Tags
                </div>
                <div className="tags-helper">
                    <div className="tags-new-tag-div"
                    onMouseOver={() => setNewTagLabel(true)}
                    onMouseLeave={() => setNewTagLabel(false)}>
                        <OpenModalButton
                        modalComponent={<CreateTagModal />}
                        buttonText={<i className="fa-solid fa-tags"/>}
                        />
                    </div>
                    <div className="tags-close-menu">
                        <button
                        onClick={() => prop.setOpenTags(false)}>
                            <i className="fa-solid fa-x"/>
                        </button>
                    </div>
                </div>
                {newTagLabel && <div className="new-tag-pop-up">
                    Create new tag
                </div>}
            </div>
            <div className="tags-body">
                {tags.map((tag: TagStructure) => (
                    <div className="single-tag-title">
                        {tag.title}
                    </div>
                )) }
            </div>
        </div>
    )
}

export default Tags;