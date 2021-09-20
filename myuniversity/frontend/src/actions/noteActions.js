import axios from '../config/axios';
import { ADD_NOTES, GET_NOTES, GET_ALL_NOTES, DELETE_NOTES, GET_ERRORS, EDIT_NOTES, CLEAR_ERRORS } from '../actions/types';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {clearErrors} from "./authActions";







export const addNote = (markData) => (dispatch) => {
    axios
        .post('http://localhost:8000/mark/addMark', markData)
        .then((res) =>
            dispatch({
                type: ADD_NOTES,
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

export const editNote = (newsData, id) => (dispatch) => {
    dispatch(clearErrors());
    axios
        .put(`http://localhost:8000/mark/updateNote/${id}`, newsData)
        .then((res) =>
            dispatch({
                type: EDIT_NOTES,
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


export const getAllNotes = () => (dispatch) => {

    axios.get('http://localhost:8000/mark/marks/')
        .then((res) => {
            dispatch({
                type: GET_ALL_NOTES,
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


export const GetNoteByUser = createAsyncThunk(
    "mark/noteUser",

    async (email) => {
        const promise = await axios
            .post("http://localhost:8000/mark/noteUser" , {email})

            .then((response) => {
                console.log("this is response");
                console.log(response);
                console.log("this is data");
                console.log(response.data);
                //console.log(response);
                const data = response.data;

                // assign data
                return data;
            });

        const data = await promise;
        return data;
    }
);



export const getNoteInfo = id => dispatch => {
    dispatch(clearErrors());

    axios
        .get(`http://localhost:8000/mark/${id}`)
        .then((res) =>
            dispatch({
                type: GET_NOTES,
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
