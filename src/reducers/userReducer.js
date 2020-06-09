import { RECEIVE_USERS } from "../actions";

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_USERS:
            let usersObj = {}
            action.users.forEach(user => {
                usersObj[user.id] = user
            })
            return Object.assign({}, state, usersObj)
        default:
            return state

    }
}

export default userReducer;
