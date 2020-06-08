import {RECEIVE_CHANNELS} from '../actions/index'

const channelReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_CHANNELS:
            return [...state, ...action.channels]
        default:
            return state
    }
}

export default channelReducer
