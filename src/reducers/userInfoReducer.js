import { UPDATE_USER_INFO } from "../actions";

const updateUserInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.userInfo,
      });
    default:
      return state;
  }
};

export default updateUserInfoReducer;
