import {combineReducers} from 'redux';
import messages from './messageReducer'
import auth from './authReducer'
import userInfo from './userInfoReducer'

export default combineReducers({
    messages,
    auth,
    userInfo,
})
