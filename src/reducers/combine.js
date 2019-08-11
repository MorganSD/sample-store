import {combineReducers} from 'redux';
import InitUserReducer from './initUser';
import CardReducer from './card_reducer';
import PostReducer from './post_reducer'

export default combineReducers ({
    InitUserReducer,
    CardReducer,
    PostReducer
})