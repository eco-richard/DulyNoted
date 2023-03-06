import { useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton";
import CreateNodeSideBar from "./CreateNoteSideBar";
import SideBarNoteCard from "./SideBarNoteCard";
import EditNotebookModal from "../EditNotebookModal";
import DeleteNotebookModal from "../DeleteNotebookModal";

import './NoteSideBar.css'
function NoteSideBar({ fromNotebook, notes, notebook }) {
  const [openNotebookActions, setOpenNotebookActions] = useState(false);

  let content;
  if (notes?.length === 0 || notes === undefined) {
    content = <CreateNodeSideBar />
  } else {
    content = (
      notes.map(note => (
        <SideBarNoteCard key={note.id} note={note} fromNotebook={fromNotebook} notebook={notebook}/>
      ))
    )
  }

  useEffect(() => {
    if (!openNotebookActions) return;

    const closeMenu = (e) => {
        setOpenNotebookActions(false);
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [openNotebookActions])

  const closeMenu = () => setOpenNotebookActions(false);

  return (
    <div className="notessidebar-wrapper">
      <div className="notessidebar-header">
        <div className="notessidebar-title">
        <h2> <i className="fa-solid fa-note-sticky"/>
        {fromNotebook ?  notebook?.title : "Notes"}
        </h2>
          {fromNotebook && <button className="notebooks-actions-button"
          onClick={() => setOpenNotebookActions(!openNotebookActions)}
          >...</button>}
          {openNotebookActions && (
            <div className="notebook-actions-dropdown-wrapper">
              <OpenModalButton
              modalComponent={<EditNotebookModal notebook={notebook}/>}
              buttonText="Rename Notebook"
              onItemClick={closeMenu}
              className="notebook-actions-dd-edit"
              />
              <OpenModalButton
              modalComponent={<DeleteNotebookModal notebook={notebook}/>}
              buttonText="Delete Notebook"
              onItemClick={closeMenu}
              className="notebook-actions-dd-edit"
              />
            </div>
          )}
        </div>
        <div className="">
          {notes?.length} notes
        </div>
      </div>
      <div className="notessidebar-body">
        {content}
        {/* {notes.length === 0 ? (
          <CreateNodeSideBar />
        ) : (
          {notes.map(note => (
            <SideBarNoteCard knote={note} />
          ))}
        )} */}
      </div>
    </div>
  )
}

export default NoteSideBar