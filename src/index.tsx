import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './Pages/App/App';
import { setupStore } from './store/strore'



declare global {
    interface Window {
        dataLayer: any
        clipboardData: ClipboardEvent["clipboardData"]
        requestDomain: string
    }
}

const store = setupStore()

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
