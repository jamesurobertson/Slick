import { RECEIVE_USERS, UPDATE_USERS } from "../actions";

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_USERS:
            let usersObj = {}
            action.users.forEach(user => {
                usersObj[user.id] = user
            })
            return Object.assign({}, state, usersObj)
        case UPDATE_USERS:
            return Object.assign({}, state,{
                [action.user.id]: action.user
            })
        default:
            return state

    }
}

export default userReducer;
