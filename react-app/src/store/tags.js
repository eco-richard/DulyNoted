// Constants
const GET_TAGS = "notes/GET_TAGS"
const GET_SINGLE_TAG = "notes/GET_SINGLE_TAG"
const ADD_TAG = "notes/ADD_TAG"
const UPDATE_TAG = "notes/UPDATE__TAG"
const REMOVE_TAG = "notes/REMOVE__TAG"

// Return Codes
export const SUCCESS = 200;
export const ERROR = 400;

// Action creators

function getTags(tags) {
    return {
        type: GET_TAGS,
        tags
    }
}

function getTag(tag) {
    return {
        type: GET_SINGLE_TAG,
        tag
    }
}

function add(tag) {
    return {
        type: ADD_TAG,
        tag
    }
}

function update(tag) {
    return {
        type: UPDATE_TAG,
        tag
    }
}

function remove(tagId) {
    return {
        type: REMOVE_TAG,
        tagId
    }
}

export function getAllTagsThunk() {
    return async (dispatch) => {
        const res = await fetch(`/api/tags`)

        if (!res.ok) {
            return [null, ERROR];
        }
        const tagsResponse = await res.json();
        const tags = tagsResponse.Tags;
        dispatch(getTags(tags))
        return [tags, SUCCESS]
    }
}

export function getSingleTagThunk(tagId) {
    return async (dispatch) => {
        const res = await fetch(`/api/tags/${tagId}`);

        if (!res.ok) {
            return [null, ERROR];
        }
        const tag = await res.json();
        dispatch(getTag(tag));
        return [tag, SUCCESS]
    }
}

export function createTagThunk(tag) {
    return async (dispatch) => {
        const res = await fetch(`/api/tags`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(tag)
        })

        if (!res.ok) {
            return [null, ERROR]
        }
        const data = await res.json();
        dispatch(add(data));
        return [data, SUCCESS];
    }
}

export function updateTagThunk(tagId, tag) {
    return async (dispatch) => {
        const res = await fetch(`/api/tags/${tagId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(tag)
        })

        if (!res.ok) {
            return [null, ERROR]
        }
        const data = await res.json();
        dispatch(update(data));
        return [data, SUCCESS]
    }
}

export function deleteTagThunk(tagId) {
    return async (dispatch) => {
        const res = await fetch(`/api/tags/${tagId}`, {
            method: "DELETE",
        })

        if (!res.ok) {
            return [null, ERROR];
        }
        const message = await res.json();
        if (message.success === true) {
            dispatch(remove(tagId));
            return [message, SUCCESS]
        }
    }
}

const initialState = {allTags: {}, singleTag: {}};
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_TAGS:
            newState = {...state, allTags: {}};
            action.tags.forEach(tag => {
                newState.allTags[tag.id] = tag;
            })
            return newState;
        case GET_SINGLE_TAG:
            newState = {...state, allTags: {...state.allTags}, singleTag: {}};
            newState.singleTag = action.tag;
            return newState;
        case ADD_TAG:
            newState = {...state, allTags: {...state.allTags}, singleTag: {}};
            newState.allTags[action.tag.id] = action.tag;
            newState.singleTag = action.tag;
            return newState;
        case UPDATE_TAG:
            newState = {...state, allTags: {...state.allTags}, singleTag: {}};
            newState.allTags[action.tag.id] = action.tag;
            newState.singleTag = action.tag;
            return newState;
        case REMOVE_TAG:
            newState = {...state, allTags: {...state.allTags}, singleTag: {}};
            delete newState.allTags[action.tagId];
            return newState;
        default:
            return state;
    }
}