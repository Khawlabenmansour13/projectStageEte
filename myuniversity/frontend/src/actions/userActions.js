import axios from "axios";
import {
    ADD_USERS,
    GET_USERS,
    GET_ALL_USERS,
    DELETE_USERS,
    CLEAR_ERRORS,
    GET_ERRORS,
    EDIT_USERS, USER_LOADING,
} from "./types";





export const getUsers =() => dispatch => {


    axios
        .get(`http://localhost:8000/user/getAllUsers/`)
        .then(res =>
            dispatch({
                type: GET_ALL_USERS,
                payload: {
                    message: res.data,
                    visible: true
                }
            })
        )
        .catch(error => {
            if (error.response && error.response.data) {
                dispatch({
                    type: GET_ERRORS,
                    payload: {
                        message: error.response.data,
                        visible: true
                    }
                })
            }
        })
};


// Set loading state
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
