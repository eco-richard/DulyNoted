import { useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getSingleNote, deleteNote } from "../../store/notes";

function SideBarNoteCard({ note, fromNotebook, notebook }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [deleteClass, setDeleteClass] = useState("sbnc-delete-div-hidden")

  const tags = note.tags.length > 3 ? note.tags.slice(2) : note.tags;

  function newNoteClick(e) {
    e.preventDefault();
    dispatch(getSingleNote(note.id))
    if (fromNotebook) {
      history.push(`/notebooks/${notebook.id}/notes/${note.id}`)
    } else {
      history.push(`/notes/${note.id}`);
    }
  }
  const deleteNoteEvent = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(note.id))
      history.push(`/home`)
    }
  }
  function tagURL(tag) {
    let tagURL;
    if (tag.title.includes(" ")) {
      const tagArray = tag.title.split(" ");
      for (let char of tagArray) {
        if (char === " ") {
          char = "%20";
        }
      }
      tagURL = tagArray.join("");
    } else {
      tagURL = tag.title;
    }
    return tagURL;
  }
  const handleTagClick = (tag) => {
    let tagURL;
    if (tag.title.includes(" ")) {
      const tagArray = tag.title.split(" ");
      for (let char of tagArray) {
        if (char === " ") {
          char = "%20";
        }
      }
      tagURL = tagArray.join("");
    } else {
      tagURL = tag.title;
    }
    history.push(`/notes/tags/${tagURL}`)
  }

  return (
    <div onClick={newNoteClick}
    className="sidebarnotecard-wrapper"
    onMouseEnter={() => setDeleteClass("sbnc-delete-div-active")}
    onMouseLeave={() => setDeleteClass("sbnc-delete-div-hidden")}>
      <div className="sbnc-header">
      <div className="sbnc-title">
        {note.title}
      </div>
      <div className={deleteClass}>
        <button className="sbnc-delete-button" onClick={deleteNoteEvent}><i class="fa-solid fa-x"></i></button>
      </div>
      </div>
      <div className="sbnc-tags">
        {tags.map(tag => (
          <div className="single-tag-div"
          onClick={() => handleTagClick(tag)}
          style={{backgroundColor: `${tag.color}`}}>
            {tag.title}
          </div>
        ))}
      </div>

    </div>
  )
}

export default SideBarNoteCard