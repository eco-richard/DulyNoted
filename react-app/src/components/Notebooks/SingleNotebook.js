import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNotebooks } from "../../store/notebooks";
import NoteSideBar from "../Notes/NoteSideBar";
import SideBar from "../SideBar";

function SingleNotebook() {
  const dispatch = useDispatch();
  const notebooks = useSelector(state => state.notebook);
  const params = useParams();


  useEffect(() => {
    dispatch(getNotebooks)
  }, [dispatch])
  if (Object.values(notebooks).length === 0) return null;

  const notebook = notebooks[params.notebookId];

  return (
    <>
    <SideBar />
    <NoteSideBar fromNotebook={true} notes={notebook.notes} notebook={notebook} />
    </>
  )
}

export default SingleNotebook;