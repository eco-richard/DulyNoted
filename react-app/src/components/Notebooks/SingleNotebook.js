import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNotebooks } from "../../store/notebooks";
import { getAllNotes } from "../../store/notes";
import NoteSideBar from "../Notes/NoteSideBar";
import SideBar from "../SideBar";

function SingleNotebook() {
  const dispatch = useDispatch();
  const notebooks = useSelector(state => state.notebook);
  const notes = useSelector(state => state.note.allNotes);
  const [loadedStore, setLoadedStore] = useState(false);
  const params = useParams();

  const notebook = notebooks[params.notebookId];

  console.log("SINGLE NOTEBOOK");
  useEffect(() => {
    dispatch(getNotebooks())
    dispatch(getAllNotes());
    setLoadedStore(true);
  }, [dispatch])

  if (!loadedStore) {
    return null;
  }
  // if (Object.values(notebooks).length === 0 ||
      // Object.values(notes).length === 0)
      // return null;


  return (
    <div className="max-container">
    <SideBar />
    <NoteSideBar fromNotebook={true} notes={notebook?.notes} notebook={notebook} />
    </div>
  )
}

export default SingleNotebook;