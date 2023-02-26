// constants
const GET_NOTEBOOKS = "notebooks/GET_NOTEBOOKS";
const ADD_NOTEBOOK = "notebooks/ADD_NOTEBOOK";
const UPDATE_NOTEBOOK = "notebooks/UPDATE_NOTEBOOK";
const REMOVE_NOTEBOOK = "notebooks/REMOVE_NOTEBOOK";

// Return codes, used to check if the thunk threw un error
const SUCCESS = 200;
const ERROR = 400;

// Action creators

function get(notebooks) {
    return {
        type: GET_NOTEBOOKS,
        notebooks,
    }
}

function add(notebook) {
    return {
        type: ADD_NOTEBOOK,
        notebook
    }
}

function update(notebook) {
    return {
        type: UPDATE_NOTEBOOK,
        notebook
    }
}

function remove(notebookId) {
    return {
        type: REMOVE_NOTEBOOK,
        notebookId
    }
}

// Thunks
export function getNotebooks() {
    return async (dispatch) => {
        const res = await fetch(`/api/notebooks`);

        if (!res.ok) {
            return [null, ERROR];
        }
        const notebooksResponse = await res.json();
        const notebooks = notebooksResponse.Notebooks;
        dispatch(get(notebooks));
        return [notebooks, SUCCESS];
    }
}

export function addNotebook(notebookData) {
    return async (dispatch) => {
        const res = await fetch(`/api/notebooks`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(notebookData) 
        })
        if (!res.ok) {
            return [null, ERROR];
        }
        const notebook = await res.json();
        dispatch(add(notebook));
        return [notebook, SUCCESS];
    }
}

export function updateNotebook(notebookData) {
    return async (dispatch) => {
        const res = await fetch(`/api/notebooks/${notebookData.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(notebookData)
        })
        if (!res.ok) {
            return [null, ERROR];
        }
        const notebook = await res.json();
        dispatch(update(notebook));
        return [notebook, SUCCESS];
    }
}

export function deleteNotebook(notebookId) {
    return async (dispatch) => {
        const res = await fetch(`/api/notebooks/${notebookId}`, {
            method: "DELETE"
        })
        if (!res.ok) {
            return [null, ERROR];
        }
        const message = await res.json();
        dispatch(remove(notebookId));
        return [message, SUCCESS];
    }
}

// Redux Reducer

// Creating the initialState
const initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_NOTEBOOKS:
            newState = {};
            action.notebooks.forEach(notebook => {
                newState[notebook.id] = notebook;
            })
            return newState;
        case ADD_NOTEBOOK:
            newState = {...state};
            newState[action.notebook.id] = action.notebook;
            return newState;
        case UPDATE_NOTEBOOK:
            newState = {...state};
            newState[action.notebook.id] = action.notebook;
        case REMOVE_NOTEBOOK:
            newState = {...state};
            delete newState[action.notebookId];
            return newState;
        default:
            return state;
    }
}
