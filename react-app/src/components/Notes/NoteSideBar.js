import CreateNodeSideBar from "./CreateNoteSideBar";
import SideBarNoteCard from "./SideBarNoteCard";

import './NoteSideBar.css'
function NoteSideBar({ fromNotebook, notes, notebook }) {

  console.log("fromNotebooks from NoteSideBar: ", fromNotebook)
  let content;
  if (notes.length === 0) {
    content = <CreateNodeSideBar />
  } else {
    content = (
      notes.map(note => (
        <SideBarNoteCard key={note.id} note={note} fromNotebook={fromNotebook} notebook={notebook}/>
      ))
    )
  }

  return (
    <div className="notessidebar-wrapper">
      <div className="notessidebar-header">
        <h2> <i className="fa-solid fa-note-sticky"/>
        {fromNotebook ?  notebook.title : "Notes"}
        </h2>
        <div className="">
          {notes.length} notes
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