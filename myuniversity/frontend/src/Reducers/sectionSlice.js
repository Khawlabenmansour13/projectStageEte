import {ADD_SECTIONS, DELETE_SECTIONS, EDIT_SECTIONS, GET_ALL_SECTIONS, GET_SECTIONS} from "../actions/types";

const initialState = {
    sections: [],
    section: {},
    loading: false,
    search: [],
    searching: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SECTIONS:
            return {
                ...state,
                sections: action.payload,
                loading: false
            };
        case GET_SECTIONS:
            return {
                ...state,
                section: action.payload,
                loading: false
            };
        case ADD_SECTIONS:
            return {
                ...state,
                sections: [ ...state.sections, action.payload ],
                section: action.payload
            };
        case EDIT_SECTIONS:
            return {
                ...state,
                section: state.section.map((section) => (section._id === action.payload._id ? (section = action.payload) : section))
            };
        case DELETE_SECTIONS:
            return {
                ...state,
                section:state.section.filter((section) => section._id !== action.payload)
            };
        default:
            return state;
    }
}
