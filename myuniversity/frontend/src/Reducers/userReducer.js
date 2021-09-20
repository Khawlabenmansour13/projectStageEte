import {
    GET_USERS,
    GET_ALL_USERS,
    USER_LOADING
} from "../actions/types";


const initialState = {
    users: [],
    user: {},
    loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
       /* case GET_EVENT:
            return {
                ...state,
                us: action.payload,
                loading: false
            };
            */
        default:
            return state;
    }
}
