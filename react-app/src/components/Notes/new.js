import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { getAllNotes, getSingleNote } from '../../store/notes';
import { getNotebooks } from '../../store/notebooks';
import { getAllTagsThunk, getSingleTagThunk } from '../../store/tags';

import SideBar from '../SideBar';
import NoteSideBar from './NoteSideBar';
import NoteBody from './NoteBody';

import './Notes.css';

function Notes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.session.user);
  const params = useParams();
  const allNotes = useSelector(state => state.note.allNotes);
  let notes = useSelector(state => state.note);
  let notebooks = useSelector(state => state.notebook);
  const tags = Object.values(useSelector(state => state.tag.allTags));
  const singleTag = useSelector(state => state.tag.singleTag);
  let singleNote = useSelector(state => state.note.sinlgeNote);
  console.log("SINGLE NOTE AT 25: ", singleNote);
  const [fromNotebook, setFromNotebook] = useState(location.pathname.includes("notebook"))
  const [fromTags, setFromTags] = useState(location.pathname.includes("tags"));
  const [tagName, setTagName] = useState(params.tagTitle || "");
  const [loaded, setLoaded] = useState(false);
  const [loadedSingleNote, setLoadedSingleNote] = useState(false);

  useEffect(() => {
    dispatch(getAllNotes());
    dispatch(getNotebooks());
    dispatch(getAllTagsThunk());
    if (loaded && singleNote === undefined) {
      const notes = Object.values(allNotes);
      const note = notes[notes.length - 1];
      console.log("IN USEEFFECT NOTE: ", note);
      console.log("IN USEEFFECT NOTE ID: ", note.id);
      dispatch(getSingleNote(note.id));
      setLoadedSingleNote(true);
    }
    setLoaded(true);
  }, [dispatch, allNotes])


  useEffect(() => {
    if (location.pathname.includes("notebook")) {
      setFromNotebook(true);
      setFromTags(false);
    } else if (location.pathname.includes("tags")) {
      setFromNotebook(false);
      setFromTags(true);
    } else {
      setFromNotebook(false);
      setFromTags(false)
    }
  }, [location.pathname])

  useEffect(() => {
    if (fromTags) {
      for (const tag of tags) {
        if (tag.title === tagName) {
          dispatch(getSingleTagThunk(tag.id))
        }
      }
    }
  }, [dispatch, tags, tagName, fromTags])

  let notebook;
  let tag;

  if (fromNotebook) {
    notebook = notebooks[params.notebookId];
    notes = notebook.notes;
    tag = null;
  } else if (fromTags) {
    notebook = null;
    tag = singleTag;
    notes = tag.notes;
  } else {
    notebook = null;
    tag = null;
    notes = Object.values(notes.allNotes);
  }

  if (singleNote === undefined) {
    dispatch(getSingleNote())
  }

  if (!loadedSingleNote) {
    return null;
  }

  console.log("SINGLENOTE: ", singleNote);
  return (
    <div className='max-container'>
      <SideBar />
      <div className='notes-container'>
        <NoteSideBar
          fromNotebook={fromNotebook}
          fromTags={fromTags}
          notes={notes}
          notebook={notebook}
          tags={singleTag}
        />
        <NoteBody
          note={singleNote}
        />
      </div>
    </div>
  )
}

export default Notes;