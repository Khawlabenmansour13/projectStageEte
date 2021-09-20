import {ADD_NOTES, DELETE_NOTES, EDIT_NOTES, GET_ALL_NOTES, GET_NOTES} from "../actions/types";

const initialState = {
    notes: [],
    note: {},
    loading: false,
    search: [],
    searching: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_NOTES:
            return {
                ...state,
                notes: action.payload,
                loading: false
            };
        case GET_NOTES:
            return {
                ...state,
                note: action.payload,
                loading: false
            };
        case ADD_NOTES:
            return {
                ...state,
                notes: [ ...state.notes, action.payload ],
                note: action.payload
            };
        case EDIT_NOTES:
            return {
                ...state,
                note: state.note.map((note) => (note._id === action.payload._id ? (note = action.payload) : note))
            };
        case DELETE_NOTES:
            return {
                ...state,
                note:state.note.filter((note) => note._id !== action.payload)
            };
        default:
            return state;
    }
}
