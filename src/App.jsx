import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import PurchasesPage from './pages/PurchasesPage';

const App = () => {
    return (
        <Provider store={store}>
            <PurchasesPage />
        </Provider>
    )
}

export default App;