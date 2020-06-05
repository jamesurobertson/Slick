import {SEND_CHANNEL_MESSAGE} from '../actions/index'

const sendChannelMessageReducer = (state = [], action) => {
    switch (action.type) {
        case SEND_CHANNEL_MESSAGE:
            return [...state, action.message];
        default:
            return state
    }
}

export default sendChannelMessageReducer
