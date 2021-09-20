import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const UpdateProfilePicture = createAsyncThunk(
//     "user/UpdateProfilePicture",
//
//     async (resources) => {
//         const promise = await axios.post(
//             "http://localhost:8000/user/uploadProfilePicture",
//             resources,
//         );
//         console.log("Image profile "+promise.data.result.reqFiles);
//         return promise.data.result;
//     }
// );

export const getUserById = createAsyncThunk("user/getUserById", async (id) => {
    const { data } = await axios.get(
        "http://localhost:8000/user/getUserById/"+id
    );

    console.log("GET USER BY ID ="+data);
    return data;
});

export const UpdateUserState = createAsyncThunk(
    "user/UpdateUserState",
    async () => {}
);

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        Resources: "",
        UserById: null,
        userUpdated: false,
    },

    extraReducers: {

        [getUserById.fulfilled]: (state, action) => {
            state.UserById = action.payload;
            state.Resources = state.UserById.image;
        },

        [UpdateUserState.fulfilled]: (state, action) => {
            state.userUpdated = !state.userUpdated;
        },
    },
});
export default UserSlice.reducer;
