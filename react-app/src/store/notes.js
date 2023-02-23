// constants
const GET_NOTES = "notes/GET_NOTES"
const GET_SINGLE_NOTE = "notes/GET_SINGLE_NOTE"
const ADD_NOTE = "notes/ADD_NOTE"
const UPDATE_NOTE = "notes/UPDATE_NOTES"
const REMOVE_NOTE = "notes/REMOVE_NOTES"

// Action creators

function getNotes(notes) {
  return {
    type: GET_NOTES,
    notes
  }
}

export function getAllNotes() {
  return async (dispatch) => {
    const res = await fetch('/api/notes')

    if (!res.ok) {
      return {"error": "An error was encountered while fetching"}
    }
    const notesRes = await res.json();
    dispatch(getNotes(notesRes.Notes))
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
    default:
      return state;
  }
}