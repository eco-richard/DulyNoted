import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Tags.css';

function Tags() {
    const dispatch = useDispatch();
    const tags = Object.values(useSelector((state: any) => state.tag.allTags));

    return (
        <div className="tags-wrapper">
            <div className="tags-header">
                <div className="tags-title">
                    Tags
                </div>
                <div className="tags-helper">

                </div>
            </div>
            <div className="tags-body">

            </div>
        </div>
    )
}

export default Tags;