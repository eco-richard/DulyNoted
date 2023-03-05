import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getAllNotes } from '../../store/notes';

import SideBar from '../SideBar';
import NoteSideBar from './NoteSideBar';
import NoteBody from './NoteBody';

import './Notes.css'
import { getNotebooks } from '../../store/notebooks';

function Notes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.session.user)
  const { notebookId } = useParams();
  let notes = useSelector(state => state.note);
  const notebooks = useSelector(state => state.notebook);
  let singleNote = useSelector(state => state.note.singleNote);
  const [fromNotebook, setFromNotebook] = useState(location.pathname.includes("notebook"));
  const [loadedNotes, setLoadedNotes] = useState(false);

  useEffect(() => {
    dispatch(getAllNotes());
    dispatch(getNotebooks());
    setLoadedNotes(true);
  }, [dispatch])

  let notebook;
  if (notebookId !== undefined) {
    notebook = notebooks[notebookId];
    notes = notebook?.notes;
  } else {
    notebook = null;
    notes = Object.values(notes.allNotes);
  }

  useEffect(() => {
    if (user.notes.length === 0) {
      notes = null;
    }
  }, [])
  if (Object.values(singleNote)?.length === 0 && notes?.length > 0) {
    singleNote = notes[notes.length - 1];
  }

  useEffect(() => {
    if (location.pathname.includes("notebook")) {
      setFromNotebook(true);
    } else {
      setFromNotebook(false);
    }
  }, [location.pathname])

  if (!loadedNotes) return null;
  // if (Object.values(notebooks).length === 0) return null;

  return (
    <div className='max-container'>
    <SideBar />
    <div className='notes-container'>
    <NoteSideBar fromNotebook={fromNotebook} notes={notes?.reverse()} notebook={notebook}/>
    <NoteBody note={singleNote}/>
    </div>
    </div>
  )
}

export default Notes;