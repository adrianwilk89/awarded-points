import {
    configureStore
} from '@reduxjs/toolkit';

import purchaseReducer from './purchases/purchaseSlice';
import usersReducer from './users/usersSlice';

export const store = configureStore({
    reducer: {
        purchases: purchaseReducer,
        users: usersReducer
    }
})