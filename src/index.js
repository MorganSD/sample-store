import React from 'react';
import {render} from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

// import configureStore from './store/configureStore';
// import defualtState from './store/defualtState';
const store = createStore(
    (state = {}) => state ,
    applyMiddleware(thunk)
    );

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
