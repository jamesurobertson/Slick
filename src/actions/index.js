export const SEND_CHANNEL_MESSAGE = 'SEND_CHANNEL_MESSSAGE'
export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'
export const CHANGE_FULL_NAME = 'CHANGE_FULL_NAME'
export const CHANGE_DISPLAY_NAME = 'CHANGE_DISPLAY_NAME'
export const CHANGE_TITLE = 'CHANGE_TITLE'
export const CHANGE_EMAIL = 'CHANGE_EMAIL'
export const CHANGE_PROFILE_PIC = 'CHANGE_PROFILE_PIC'

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

export const changeFullName = fullName => {
    return {
        type: CHANGE_FULL_NAME,
        fullName
    }
}

export const changeDisplayNAme = displayName => {
    return {
        type: CHANGE_DISPLAY_NAME,
        displayName
    }
}

export const changeTitle = title => {
    return {
        type: CHANGE_TITLE,
        title
    }
}

export const changeEmail = email => {
    return {
        type: CHANGE_EMAIL,
        email
    }
}

export const changeProfilePic = imageUrl => {
    return {
        type: CHANGE_PROFILE_PIC,
        imageUrl
    }
}
