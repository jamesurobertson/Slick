import {SEND_CHANNEL_MESSAGE, RECEIVE_MESSAGES} from '../actions/index'



const sendChannelMessageReducer = (state = {}, action) => {
    switch (action.type) {
        case SEND_CHANNEL_MESSAGE:
            return Object.assign({}, state, {
                [action.message.message.id]: action.message.message
            })
        case RECEIVE_MESSAGES:
            return Object.assign({}, state, {
                [action.message.id]: action.message
            })
        default:
            return state
    }
}


export default sendChannelMessageReducer
