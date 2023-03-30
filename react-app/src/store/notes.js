// constants
const GET_NOTES = "notes/GET_NOTES"
const GET_SINGLE_NOTE = "notes/GET_SINGLE_NOTE"
const ADD_NOTE = "notes/ADD_NOTE"
const UPDATE_NOTE = "notes/UPDATE_NOTE"
const REMOVE_NOTE = "notes/REMOVE_NOTE"

// Return codes
export const SUCCESS = 200
export const ERROR = 400;

// Action creators

function getNotes(notes) {
  return {
    type: GET_NOTES,
    notes
  }
}

function getNote(note) {
  return {
    type: GET_SINGLE_NOTE,
    note
  }
}

function add(note) {
  return {
    type: ADD_NOTE,
    note
  }
}

function update(note) {
  return {
    type: UPDATE_NOTE,
    note
  }
}

function remove(noteId) {
  return {
    type: REMOVE_NOTE,
    noteId
  }
}

export function getAllNotes() {
  return async (dispatch) => {
    const res = await fetch('/api/notes')

    if (!res.ok) {
      return ERROR;
    }
    const notesRes = await res.json();
    dispatch(getNotes(notesRes.Notes))
    return SUCCESS;
  }
}

export function getSingleNote(noteId) {
  return async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}`)

    if (!res.ok) {
      return ERROR;
    }
    const note = await res.json();
    dispatch(getNote(note));
    return SUCCESS;
  }
}

export function createNote(note) {
  return async (dispatch) => {
    const res = await fetch(`/api/notes`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(note)
    })

    if (!res.ok) {
      return ERROR;
    }
    const data = await res.json();
    dispatch(add(data));
    return data;
  }
}

export function editNote(noteId, note) {
  return async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(note)
    })

    if (!res.ok) {
      return [null, ERROR];
    }
    const data = await res.json();
    dispatch(update(data));
    return [data, SUCCESS];
  }
}

export function deleteNote(noteId) {
  return async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}`, {
      method: "DELETE"
    })
    if (!res.ok) {
      return ERROR;
    }
    const data = await res.json();
    if (data.success === true) {
      dispatch(remove(noteId))
      return SUCCESS
    }
    return ERROR;
  }
}

const initialState = {allNotes: {}, singleNote: {}}
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_NOTES:
      newState = {...state, allNotes: {}};
      action.notes.forEach(note => {
        newState.allNotes[note.id] = note
      })
      return newState;
    case GET_SINGLE_NOTE:
      newState = {...state, allNotes: {...state.allNotes}, singleNote: {}}
      newState.singleNote = action.note;
      return newState;
    case ADD_NOTE:
      newState = {...state, allNotes: {...state.allNotes}, singleNote: {}}
      newState.singleNote = action.note;
      newState.allNotes[action.note.id] = action.note;
      return newState;
    case UPDATE_NOTE:
      newState = {...state, allNotes: {...state.allNotes}, singleNote: {}}
      newState.singleNote = action.note;
      newState.allNotes[action.note.id] = action.note;
      return newState;
    case REMOVE_NOTE:
      newState = {...state, allNotes: {...state.allNotes}, singleNote: {}}
      delete newState.allNotes[action.noteId];
      return newState;
    default:
      return state;
  }
}