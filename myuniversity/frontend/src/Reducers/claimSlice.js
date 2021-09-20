import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {getUserById, UpdateUserState} from "./userSlice";

export const sendClaim = createAsyncThunk(
    "claim/sendClaim",
    async (claim) => {
        const { response } = await axios.post(
            "http://localhost:8000/claim/sendClaim",
            claim
        );

        return response.data;
    }
);




export const getClaims = createAsyncThunk(
    "claim/claims",
    async (claim) => {
        const { response } = await axios.post(
            "http://localhost:8000/claim/sendClaim",
            claim
        );

        return response.data;
    }
);




export const ClaimSlice = createSlice({
    name: "claim",
    initialState: {
        claims: [],
        status: "",
    },

    extraReducers: {
        [getClaims.pending]: (state, action) => {
            state.status = "PENDING";
        },
        [getClaims.fulfilled]: (state, { payload }) => {
            state.getClaims = payload;
            state.status = "success";
        },
        [getClaims.rejected]: (state, action) => {
            state.status = "failed";
        },
        postClaim: (state, action) => {
            state.getClaims.push(action.payload);
        },
    },
});
export default ClaimSlice.reducer;
