export const SEND_CHANNEL_MESSAGE = 'SEND_CHANNEL_MESSSAGE'
export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'

export const sendChannelMessage = message => {
    return {
        type: SEND_CHANNEL_MESSAGE,
        message,
    }
}

export const updateToken = token => {
    return {
        type: UPDATE_TOKEN,
        token
    }
}


export const updateCurrentUser = currentUserId =>{
    return {
        type: UPDATE_CURRENT_USER,
        currentUserId
    }
}
