import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, getSingleNote } from "../../store/notes";
import { useHistory } from "react-router-dom";

import './ScratchPad.css'
function ScratchPad() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [scratchBody, setScratchBody] = useState(localStorage.getItem("scratch") || "")
  const [emptyScratch, setEmptyScratch] = useState(scratchBody.length === 0);

  const updateScratch = () => {
    localStorage.setItem("scratch", scratchBody)
  }

  const clearScratch = () => {
    localStorage.removeItem("scratch");
    setScratchBody("");
  }

  const convertScratch = async () => {
    const date = new Date().toISOString().slice(0, 10);
    console.log("SCRATCH BODY: ", scratchBody);
    const note = await dispatch(createNote({
      title: "Untitled",
      body: scratchBody,
      created_at: date,
      updated_at: date,
    }));

    await dispatch(getSingleNote(note));
    localStorage.removeItem("scratch");
    history.push(`/notes/${note.id}`);
  }

  useEffect(() => {
    if (scratchBody.length === 0) {
      setEmptyScratch(true);
    } else {
      setEmptyScratch(false);
    }
  }, [scratchBody])

  return (
    <>
    <div className="scratch-header">
    <div className="scratch-title">
      SCRATCH PAD
    </div>
    <div className="scratch-buttons">
      <div className="scratch-new-note">
        <button
        disabled={emptyScratch}
        onClick={convertScratch}>
          <i className="fa-solid fa-square-plus"></i></button>
      </div>
      <div className="scratch-clear">
        <button onClick={clearScratch}><i className="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
    </div>
    <div className="scratch-body">
      <textarea
      value={scratchBody}
      onChange={(e) => setScratchBody(e.target.value)}
      onBlur={updateScratch}
      placeholder="Start writing..."
      />
    </div>
    </>
  )
}

export default ScratchPad;