import React from "react";
import { render } from "react-dom";
// import Main from "./main";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import mainReducer from "./reducers/combine";
import { createLogger } from 'redux-logger'
import App from "./App";


const loggerMiddleware = createLogger()
const store = createStore(
  mainReducer,
  compose(
    applyMiddleware(thunk)
    // applyMiddleware(thunk , loggerMiddleware) /* preloadedState, */
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
