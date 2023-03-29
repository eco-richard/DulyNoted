import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { getAllNotes, getSingleNote } from '../../store/notes';

import SideBar from '../SideBar';
import NoteSideBar from './NoteSideBar';
import NoteBody from './NoteBody';

import './Notes.css'
import { getNotebooks } from '../../store/notebooks';
import { getAllTagsThunk, getSingleTagThunk } from '../../store/tags';

function Notes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.session.user)
  const params = useParams();
  const { notebookId, tagTitle } = useParams();
  let notes = useSelector(state => state.note);
  const notebooks = useSelector(state => state.notebook);
  const tags = Object.values(useSelector(state => state.tag.allTags));
  const singleTag = useSelector(state => state.tag.singleTag);
  let singleNote = useSelector(state => state.note.singleNote);
  const [fromNotebook, setFromNotebook] = useState(location.pathname.includes("notebook"));
  const [usesTags, setUsesTags] = useState(location.pathname.includes("tags"));
  const [loadedNotes, setLoadedNotes] = useState(false);
  console.log("PARAMS: ", params);
  console.log("NOTES: ", notes);
  console.log("TAGS OUTSIDE:: ", tags);
  console.log("SINGLE TAG: ", singleTag);
  const [tagName, setTagName] = useState(convertTagURL(tagTitle) || "");

  useEffect(() => {
    if (location.pathname.includes("tags")) {
      setUsesTags(true);
      if (tagTitle.includes("%20")) {
        setTagName(convertTagURL(tagTitle));
      }
    } else {
      setUsesTags(false);
    }
  }, [location.pathname, tagTitle])

  console.log("TAGNAME: ", tagName);
  useEffect(() => {
    dispatch(getAllNotes());
    dispatch(getNotebooks());
    dispatch(getAllTagsThunk());
    setLoadedNotes(true);
  }, [dispatch])

  useEffect(() => {
    if (usesTags) {
      if (tags.length) {
        for (let tag of tags) {
          if (tag.title === params.tagTitle) {
            dispatch(getSingleTagThunk(tag.id));
          }
        }
      }
    }

    if (Object.values(singleNote).length === 0) {
      if (notes.length) {
        console.log("notes: ", notes);
        dispatch(getSingleNote(notes[notes.length - 1].id));
      }
    }
  }, [dispatch])

  function convertTagURL(tagURL) {
    if (!usesTags) {
      return "";
    } else {
      const tagURLArray = tagURL?.split("%20");
      return tagURLArray?.join(" ");
    }
  }


  // if (user)
  let notebook;
  if (notebookId !== undefined) {
    notebook = notebooks[notebookId];
    notes = notebook?.notes;
  } else {
    notebook = null;
    notes = Object.values(notes.allNotes);
  }

  // useEffect(() => {
  //   if (user.notes.length === 0) {
  //     notes = null;
  //   }
  // }, [])


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

  if (user === null) {
    return <Redirect to="/" />;
  }
  if (!loadedNotes) return null;

  if (usesTags) {
    notes = singleTag.notes;
  }
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