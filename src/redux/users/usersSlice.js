import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';

import {
    initialState
} from './initialState';

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
    try {
        const response = await fetch('http://localhost/public/randomUsers.json', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })

        const users = await response.json()
        // console.log(users, 'users')
        return users

    } catch (error) {
        throw Error(error)
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.loading = true
            state.error = null;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.loading = false;
            state.error = null;
        }
    }
})

export default usersSlice.reducer;