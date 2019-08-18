import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

//rdx
import { createStore, combineReducers } from 'redux';
import {Provider} from 'react-redux';

//reducers
import CatReducer from './reducers/CatReducer';
import LocReducer from './reducers/LocReducer';
import ModalReducer from './reducers/ModalReducer';

const rootReducer = combineReducers(
  {
    categories: CatReducer,
    locations: LocReducer,
    modal: ModalReducer
    });

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store={store}> <App/> </Provider>, document.getElementById('root'));

serviceWorker.unregister();
