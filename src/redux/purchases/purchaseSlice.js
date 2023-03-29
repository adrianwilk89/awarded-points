import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';

import { initialState } from './initialState';

export const fetchPurchases = createAsyncThunk('purchases/fetch', async (userId) => {
    try {
        const response = await fetch('http://localhost/public/randomPurchases.json', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        const purchases = await response.json()
        return {
            purchases,
            userId
        }

    } catch (error) {
        throw Error(error)
    }
})

const purchaseSlice = createSlice({
    name: 'purchases',
    initialState,
    extraReducers: {
        [fetchPurchases.pending]: (state) => {
            state.loading = true
            state.error = null;
        },
        [fetchPurchases.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        [fetchPurchases.fulfilled]: (state, action) => {
            state.purchases = action.payload.purchases.filter(p => p.userId === Number(action.payload.userId));
            state.loading = false;
            state.error = null;
        }
    }
})

export default purchaseSlice.reducer;