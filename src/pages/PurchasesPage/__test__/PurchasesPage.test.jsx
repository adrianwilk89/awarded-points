import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PurchasesPage from '../PurchasesPage';
import { fetchPurchases } from 'Redux/purchases/purchaseSlice';
import { fetchUsers } from 'Redux/users/usersSlice';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.mock('Redux/purchases/purchaseSlice', () => ({
    fetchPurchases: jest.fn().mockImplementation(() => ({ type: 'purchases/fetch/pending' }))
}))

jest.mock('Redux/users/usersSlice', () => ({
    fetchUsers: jest.fn().mockImplementation(() => ({ type: 'users/fetch/pending' }))
}))

describe('PurchasesPage', () => {

    let mockStore;

    beforeEach(() => {
        mockStore = configureStore([thunk])
    })

    test('should dispatch users/fetch when component is mounted', () => {
        const store = mockStore({
            users: { users: [] },
            purchases: { purchases: [] }
        });

        render(
            <Provider store={store}>
                <PurchasesPage />
            </Provider>);

        const expectedAction = 'users/fetch/pending';

        expect(store.getActions()[0].type).toEqual(expectedAction);
        expect(fetchUsers).toBeCalled()
    })


    test('should dispatch purchases/fetch action when user was selected', () => {
        const store = mockStore({
            users: { users: [{ id: 1, name: 'Joe' }] }, purchases: {
                purchases: []
            }
        });

        const { getByTestId } = render(
            <Provider store={store}>
                <PurchasesPage />
            </Provider>);

        const expectedArgument = '1';

        fireEvent.change(getByTestId('select-user'), { target: { value: expectedArgument } })

        expect(fetchPurchases).toBeCalledWith(expectedArgument)
    })

    test('should display loader when purchases/fetch action was dispached', () => {
        const store = mockStore({
            users: { users: [] }, purchases: {
                loading: true,
                purchases: []
            }
        });

        const { getByTestId } = render(
            <Provider store={store}>
                <PurchasesPage />
            </Provider>);
        expect(getByTestId('loader')).toBeTruthy()
    })

    test('should display summary when purchases are provided', () => {
        const store = mockStore({
            users: { users: [] }, purchases: {
                loading: false,
                purchases: [{
                    "id": 0,
                    "userId": 8,
                    "amount": 36,
                    "date": "2023-01-07T14:46:06.841Z"
                },
                {
                    "id": 1,
                    "userId": 8,
                    "amount": 8,
                    "date": "2023-03-30T08:38:32.833Z"
                },
                {
                    "id": 2,
                    "userId": 10,
                    "amount": 37,
                    "date": "2023-01-04T22:53:11.179Z"
                }]
            }
        });

        const { getByTestId } = render(
            <Provider store={store}>
                <PurchasesPage />
            </Provider>);

        expect(getByTestId('purchase-summary')).toBeTruthy()
    })
})