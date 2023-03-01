import { useState } from "react";

import './ScratchPad.css'
function ScratchPad() {
  const [scratchBody, setScratchBody] = useState(localStorage.getItem("scratch") || "");

  const updateScratch = () => {
    localStorage.setItem("scratch", scratchBody)
  }

  return (
    <>
    <div className="scratch-title">
      SCRATCH PAD
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