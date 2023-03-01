import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getAllNotes } from '../../store/notes';

import SideBar from '../SideBar';
import NoteSideBar from './NoteSideBar';
import NoteBody from './NoteBody';

import './Notes.css'
import { getNotebooks } from '../../store/notebooks';

function Notes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { notebookId } = useParams();
  let notes = useSelector(state => state.note);
  const notebooks = useSelector(state => state.notebook);
  let singleNote = useSelector(state => state.note.singleNote);
  const [fromNotebook, setFromNotebook] = useState(location.pathname.includes("notebook"));

  useEffect(() => {
    dispatch(getAllNotes());
    dispatch(getNotebooks());
  }, [dispatch])

  let notebook;
  if (notebookId !== undefined) {
    notebook = notebooks[notebookId];
    notes = notebook.notes;
  } else {
    notebook = null;
    notes = Object.values(notes.allNotes);
  }

  if (Object.values(singleNote).length === 0) {
    singleNote = notes[notes.length - 1];
  }

  useEffect(() => {
    if (location.pathname.includes("notebook")) {
      setFromNotebook(true);
    } else {
      setFromNotebook(false);
    }
  }, [location.pathname])

  if (Object.values(notes).length === 0) return null;
  if (Object.values(notebooks).length === 0) return null;

  return (
    <>
    <SideBar />
    <div className='notes-container'>
    <NoteSideBar fromNotebook={fromNotebook} notes={notes.reverse()} notebook={notebook}/>
    <NoteBody note={singleNote}/>
    </div>
    </>
  )
}

export default Notes;