import {backendUrl} from '../config/index'

export const CHANGE_CHANNEL = "CHANGE_CHANNEL";
export const UPDATE_CHANNEL_INFO = "UPDATE_CHANNEL_INFO";


export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const LOGOUT = "LOGOUT";
export const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export const UPDATE_USERS = "UPDATE_USERS";

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";

export const EDIT_CHANNEL_MESSAGE = "EDIT_CHANNEL_MESSAGE";
export const SEND_CHANNEL_MESSAGE = "SEND_CHANNEL_MESSSAGE";
export const DELETE_CHANNEL_MESSAGE = "DELETE_CHANNEL_MESSAGE";

export const ADD_CHANNEL = "ADD_CHANNEL";
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL'

export const addChannel = (channel) => {
  return {
    type: ADD_CHANNEL,
    channel,
  };
};

export const logout = (session) => {
  return {
    type: LOGOUT,
    session,
  };
};

export const removeChannel = channel => {
    return {
        type: REMOVE_CHANNEL,
        channel
    }
}

export const updateUsers = (user) => {
  return {
    type: UPDATE_USERS,
    user,
  };
};
export const sendChannelMessage = (message) => {
  return {
    type: SEND_CHANNEL_MESSAGE,
    message,
  };
};

export const editChannelMessage = payload => {
    return {
        type: EDIT_CHANNEL_MESSAGE,
        payload
    }
}

export const deleteChannelMessage = (message) => {
    return {
        type: DELETE_CHANNEL_MESSAGE,
        message,
    }
}

export const updateToken = (token) => {
  return {
    type: UPDATE_TOKEN,
    token,
  };
};

export const updateCurrentUser = (currentUserId) => {
  return {
    type: UPDATE_CURRENT_USER,
    currentUserId,
  };
};

export const updateUserInfo = (userInfo) => {
  return {
    type: UPDATE_USER_INFO,
    userInfo,
  };
};

export const updateChannelInfo = (channelInfo) => {
  return {
    type: UPDATE_CHANNEL_INFO,
    channelInfo,
  };
};

export const receiveChannels = (channels) => {
  return {
    type: RECEIVE_CHANNELS,
    channels,
  };
};

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

export const changeChannel = (channel) => {
  return {
    type: CHANGE_CHANNEL,
    channel,
  };
};

export const receiveMessages = (messages) => {
  return {
    type: RECEIVE_MESSAGES,
    messages,
  };
};

// all channels a particular user is apart of
export const getChannels = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`${backendUrl}/user/channel/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
      },
    });

    if (!res.ok) throw res;
    // TODO: MOVE FOREACH TO REDUCER
    const channels = await res.json();
    dispatch(receiveChannels(channels));
  } catch (e) {
    console.error(e);
  }
};

export const deleteRemoveChannel = channelId => async dispatch => {
    try {
        const res = await fetch(`${backendUrl}/channel/${channelId}`, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
            },
          });

        if (!res.ok) throw res

        const channel = await res.json()
        dispatch(removeChannel(channel))
    } catch (e) {
        console.error(e)
    }
}

export const getAllMessages = () => async (dispatch) => {
  try {
    const res = await fetch(`${backendUrl}/message`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
      },
    });

    if (!res.ok) throw res;
    const messages = await res.json();
    let messPlusDisplayName = messages.map((message) => {
      const {
        id,
        userId,
        content,
        messageableType,
        messageableId,
        createdAt,
        User: { fullName, displayName, profileImageUrl },
      } = message;
      return {
        id,
        userId,
        content,
        messageableType,
        messageableId,
        createdAt,
        displayName,
        profileImageUrl,
        fullName,
      };
    });
    dispatch(receiveMessages(messPlusDisplayName));
  } catch (e) {
    console.error(e);
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await fetch(`${backendUrl}/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
      },
    });

    if (!res.ok) throw res;
    const users = await res.json();
    dispatch(receiveUsers(users));
  } catch (e) {
    console.error(e);
  }
};

export const getUserInfo = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`${backendUrl}/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
      },
    });

    if (!res.ok) throw res;
    const user = await res.json();
    dispatch(updateUserInfo(user));
  } catch (e) {
    console.error(e);
  }
};

export const postChannelMessage = (
  content,
  channelId,
  displayName,
  fullName,
  profileImageUrl
) => async (dispatch) => {
  try {
    const res = await fetch(`${backendUrl}/message/${channelId}`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
      },
    });

    if (!res.ok) throw res;
    const message = await res.json();
    message.message.displayName = displayName;
    message.message.profileImageUrl = profileImageUrl;
    message.message.fullName = fullName
    // message.message.fullName = fullName
    dispatch(sendChannelMessage(message));
  } catch (e) {
    console.error(e);
  }
};

export const deleteMessage = (messageId) => async (dispatch) => {
    try {
      const res = await fetch(`${backendUrl}/message/${messageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
        },
      });

      if (!res.ok) throw res;
      dispatch(deleteChannelMessage({id: messageId}));
    } catch (e) {
      console.error(e);
    }
  };

export const postAddChannel = (channelName) => async (dispatch) => {
  const encodedChannelName = encodeURIComponent(channelName);
  try {
    const res = await fetch(
      `${backendUrl}/channel/${encodedChannelName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
        },
      }
    );

    if (!res.ok) throw res;

    const channel = await res.json();
    dispatch(addChannel(channel));
    dispatch(changeChannel([channel.id, channel.name]));
  } catch (e) {
    console.error(e);
  }
};

export const postAddDm = (toMessageId) => async (dispatch) => {
  try {
    const body = { toMessageId };
    const res = await fetch(`${backendUrl}/directMessage`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
      },
    });

    if (!res.ok) throw res;

    const { payload: channel, userToMessage } = await res.json();
    dispatch(addChannel(channel));
    dispatch(changeChannel([channel.id, userToMessage]));
  } catch (e) {
    console.error(e);
  }
};

export const postCreateChannel = (name) => async (dispatch) => {
  try {
    const body = { name };
    const res = await fetch(`${backendUrl}/channel`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
      },
    });

    if (!res.ok) throw res;

    const channel = await res.json();
    dispatch(addChannel(channel));
    dispatch(changeChannel([channel.id, channel.name]));
  } catch (e) {
    console.error(e);
  }
};

export const postImage = (img, userInfo) => async (dispatch) => {
  try {
    const res = await fetch(`${backendUrl}/user/updateUser`, {
      method: "PUT",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
      },
    });

    if (!res.ok) throw res;

    const user = await res.json();
    dispatch(updateUserInfo(user));
    dispatch(updateUsers(user));
  } catch (e) {
    console.error(e);
  }

  if (!img) return;
  try {
    const res = await fetch(`${backendUrl}/aws/post_file`, {
      method: "POST",
      body: img,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
      },
    });

    if (!res.ok) throw res;

    const response = await res.json();
    dispatch(updateUserInfo(response));
    dispatch(updateUsers(response));
  } catch (e) {
    console.error(e);
  }
};

export const putUpdateUserInfo = (userInfo) => async (dispatch) => {};

export const postChannelUpdate = (channelId, topic, numUsers) => async (
  dispatch
) => {
  try {
    const res = await fetch(`${backendUrl}/channel/${channelId}`, {
      method: "PUT",
      body: JSON.stringify({ topic, numUsers }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
      },
    });

    if (!res.ok) throw res;

    const { payload } = await res.json();
    dispatch(updateChannelInfo(payload));
  } catch (e) {
    console.error(e);
  }
};

export const putEditMessage = (messageId, content) => async (dispatch) => {
    console.log(messageId, content)
    try {
        const res = await fetch(`${backendUrl}/message/${messageId}`, {
            method: "PUT",
            body: JSON.stringify({content}),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SLICK_ACCESS_TOKEN")}`,
            },
          });

          if (!res.ok) throw res

          dispatch(editChannelMessage([messageId, content]))
    } catch (e) {
        console.error(e)
    }
}
