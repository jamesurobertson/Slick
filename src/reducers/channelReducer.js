import {RECEIVE_CHANNELS, UPDATE_CHANNEL_INFO, ADD_CHANNEL, REMOVE_CHANNEL} from '../actions/index'

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
        case ADD_CHANNEL:
            let channelIdd = action.channel.id
            return Object.assign({}, state, {
                [channelIdd]: action.channel
            })
        case REMOVE_CHANNEL:
            const removedId = action.channel.channelId
            let copy = Object.assign({}, state)
            delete copy[removedId]
            return Object.assign({}, copy)
        default:
            return state
    }
}



export default channelReducer
