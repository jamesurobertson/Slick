import {RECEIVE_CHANNELS} from '../actions/index'

const channelReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CHANNELS:
            const channel = action.channels.Channel
            // return [...state, ...action.channels]
            return Object.assign({}, state, {
                [channel.id]: channel
            })
        default:
            return state
    }
}


export default channelReducer
