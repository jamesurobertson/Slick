import {combineReducers} from 'redux';
import messages from './messageReducer'
import auth from './authReducer'

export default combineReducers({
    messages,
    auth,
})
