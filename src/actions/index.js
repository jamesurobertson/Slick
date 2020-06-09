export const SEND_CHANNEL_MESSAGE = 'SEND_CHANNEL_MESSSAGE'
export const CHANGE_CHANNEL = 'CHANGE_CHANNEL'
export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS'
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'


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


export const updateCurrentUser = currentUserId => {
    return {
        type: UPDATE_CURRENT_USER,
        currentUserId
    }
}


export const updateUserInfo = userInfo => {
    return {
        type: UPDATE_USER_INFO,
        userInfo
    }
}

export const receiveChannels = channels => {
    return {
        type: RECEIVE_CHANNELS,
        channels
    }
}

export const changeChannel = channel => {
    return {
        type: CHANGE_CHANNEL,
        channel
    }
}

export const receiveMessages = message => {
    return {
        type: RECEIVE_MESSAGES,
        message
    }
}

// all channels a particular user is apart of
export const getChannels = (userId) => async dispatch => {

    try {
        const res = await fetch(`http://localhost:8080/user/channel/${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`
            }
        })

        if (!res.ok) throw res
        const channels = await res.json()
        channels.forEach(channel => {
            dispatch(receiveChannels(channel))
        })

    } catch (e) {
        console.error(e)
    }
}

export const getAllMessages = () => async dispatch => {
    try {
        const res = await fetch('http://localhost:8080/message', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`
            }
        })

        if (!res.ok) throw res
        const messages = await res.json()
        messages.forEach(message => {
            dispatch(receiveMessages(message))
        })

    } catch(e) {
        console.error(e)
    }
}

// export const getChannelMessages = (messages, channelName) => async dispatch => {
//     try {
//         const res = await fetch('http://localhost:8080/')
//     } catch (e) {
//         console.error(e)
//     }
// }


export const getUserInfo = (userId) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:8080/user/${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`
            }
        })

      if (!res.ok) throw res;
      const user = await res.json()
      dispatch(updateUserInfo(user))

    } catch (e) {
      console.error(e);
    }
  };

  export const postChannelMessage = (content, channelId, userId) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:8080/message/${channelId}/${userId}`,
        {
            method: 'POST',
            body: JSON.stringify({content}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`
            }
        })

      if (!res.ok) throw res;
      const message = await res.json()
      dispatch(sendChannelMessage(message))

    } catch (e) {
      console.error(e);
    }
  }
