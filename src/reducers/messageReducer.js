import {SEND_CHANNEL_MESSAGE, EDIT_CHANNEL_MESSAGE, RECEIVE_MESSAGES, DELETE_CHANNEL_MESSAGE} from '../actions/index'



const sendChannelMessageReducer = (state = {}, action) => {
    switch (action.type) {
        case SEND_CHANNEL_MESSAGE:
            return Object.assign({}, state, {
                [action.message.message.id]: action.message.message
            })
        case RECEIVE_MESSAGES:
            let messagesObj = {}
            action.messages.forEach(message => {
                messagesObj[message.id] = message
            })
            return Object.assign({}, state, messagesObj)
        case DELETE_CHANNEL_MESSAGE:
            return Object.assign({}, state, {
                [action.message.id]: ''
            })
        case EDIT_CHANNEL_MESSAGE:
            console.log(action)
            const message = Object.assign({}, state[action.payload[0]])
            console.log(message)
            message.content = action.payload[1]
            console.log(message)
            return Object.assign({}, state, {
                [action.payload[0]]: message
            })
        default:
            return state
    }
}


export default sendChannelMessageReducer
