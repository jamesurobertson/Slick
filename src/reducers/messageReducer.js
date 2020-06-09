import {SEND_CHANNEL_MESSAGE, RECEIVE_MESSAGES} from '../actions/index'



const sendChannelMessageReducer = (state = {}, action) => {
    switch (action.type) {
        case SEND_CHANNEL_MESSAGE:
            console.log(action)
            return Object.assign({}, state, {
                [action.message.message.id]: action.message.message
            })
        case RECEIVE_MESSAGES:
            let messagesObj = {}
            action.messages.forEach(message => {
                messagesObj[message.id] = message
            })
            return Object.assign({}, state, messagesObj)
        default:
            return state
    }
}


export default sendChannelMessageReducer
