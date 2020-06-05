export const SEND_CHANNEL_MESSAGE = 'SEND_CHANNEL_MESSSAGE'

export const sendChannelMessage = message => {
    return {
        type: SEND_CHANNEL_MESSAGE,
        message,
    }
}
