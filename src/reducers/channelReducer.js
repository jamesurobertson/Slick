import {RECEIVE_CHANNELS, UPDATE_CHANNEL_INFO} from '../actions/index'

const channelReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CHANNELS:
            const channelObj = {}
            action.channels.forEach(channel => {
                channelObj[channel.id] = channel
            })
            return Object.assign({}, state, channelObj)
        case UPDATE_CHANNEL_INFO:
            let channelId = action.channelInfo.id
            return Object.assign({}, state,{
                [channelId]: action.channelInfo
            })
        default:
            return state
    }
}



export default channelReducer
