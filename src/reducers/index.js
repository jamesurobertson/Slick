import {combineReducers} from 'redux';
import messages from './messageReducer'
import session from './sessionReducer'
import userInfo from './userInfoReducer'
import channels from './channelReducer'
import users from './userReducer'

export default combineReducers({
    messages,
    session,
    userInfo,
    channels,
    users,
})
