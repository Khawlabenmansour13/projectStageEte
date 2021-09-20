import axios from '../config/axios';
import {
    ADD_SECTIONS,
    GET_SECTIONS,
    GET_ALL_SECTIONS,
    DELETE_SECTIONS,
    GET_ERRORS,
    EDIT_SECTIONS,
    CLEAR_ERRORS,
    AFFECTER_USER_SECTION, GET_SECTION
} from '../actions/types';
import {createAsyncThunk} from "@reduxjs/toolkit";







export const addNote = (markData) => (dispatch) => {
    axios
        .post('http://localhost:8000/section/addSection', markData)
        .then((res) =>
            dispatch({
                type: ADD_SECTIONS,
                payload: res.data
            })
        )
        .catch((error) => {
            if (error.response && error.response.data) {
                dispatch({
                    type: GET_ERRORS,
                    payload: {
                        message: error.response.data,
                        visible: true
                    }
                });
            }
        });
};
/*
export const editMark = (newsData, id) => (dispatch) => {
    dispatch(clearErrors());
    axios
        .put(`/news/update/${id}`, newsData)
        .then((res) =>
            dispatch({
                type: EDIT_SECTIONS,
                payload: res.data
            })
        )
        .catch((error) => {
            if (error.response && error.response.data) {
                dispatch({
                    type: GET_ERRORS,
                    payload: {
                        message: error.response.data,
                        visible: true
                    }
                });
            }
        });
};
*/

export const getAllSections = () => (dispatch) => {

    axios.get('http://localhost:8000/section/')
        .then((res) => {
            dispatch({
                type: GET_ALL_SECTIONS,
                payload: res.data
            });
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                dispatch({
                    type: GET_ERRORS,
                    payload: {
                        message: error.response.data,
                        visible: true
                    }
                });
            }


        });
};






export const getSection  = id => dispatch => {
    dispatch(clearErrors());

    axios
        .get(`http://localhost:8000/section/getSectionById/${id}`)
        .then(res =>
            dispatch({
                type: GET_SECTIONS,
                payload: res.data
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
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
