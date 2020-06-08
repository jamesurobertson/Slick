export const SEND_CHANNEL_MESSAGE = 'SEND_CHANNEL_MESSSAGE'
export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS'

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
        console.log(`getchannels`, channels)
        const channelArray = []
        channels.forEach(channel => {
            const {Channel: {name}} = channel
            channelArray.push(name)
        })
        dispatch(receiveChannels(channelArray))

    } catch (e) {
        console.error(e)
    }
}


export const getUserInfo = (userId) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:8080/user/${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
            }
        })

      if (!res.ok) throw res;
      const user = await res.json()
      console.log(user)
      dispatch(updateUserInfo(user))

    } catch (e) {
      console.error(e);
    }
  };
