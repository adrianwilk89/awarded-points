import React, { useEffect, useState } from 'react';
import { fetchPurchases } from 'Redux/purchases/purchaseSlice';
import { fetchUsers } from 'Redux/users/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import PurchasesSummary from './components/PurchasesSummary';
import Loader from 'Common/components/Loader';
import * as P from './parts'

const PurchasesPage = () => {

    const [selectedUserId, setSelectedUserId] = useState('placeholder');
    const { users } = useSelector(store => store.users)
    const { purchases, loading } = useSelector(store => store.purchases)

    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedUserId !== 'placeholder') {
            dispatch(fetchPurchases(selectedUserId))
        }
    }, [selectedUserId])

    useEffect(() => {
        dispatch(fetchUsers());
    }, [])

    const handleUserSelect = ({ target: { value } }) => {
        setSelectedUserId(value)
    }

    return (
        <P.PurchasesPage>
            <P.PurchasesPageUsersSelect onChange={handleUserSelect} value={selectedUserId}>
                <P.PurchasesPageUsersOption value="placeholder" disabled hidden>
                    Select user
                </P.PurchasesPageUsersOption>
                {users?.map(user => (
                    <P.PurchasesPageUsersOption key={user.id} value={user.id}>
                        {user.name}
                    </P.PurchasesPageUsersOption>)
                )}
            </P.PurchasesPageUsersSelect>
            {loading ? <Loader /> : purchases.length && !loading ? <PurchasesSummary purchases={purchases} /> : null}
        </P.PurchasesPage>
    )
}

export default PurchasesPage