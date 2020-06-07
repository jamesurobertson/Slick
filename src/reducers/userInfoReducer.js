import {
  CHANGE_FULL_NAME,
  CHANGE_DISPLAY_NAME,
  CHANGE_TITLE,
  CHANGE_EMAIL,
} from "../actions";


const updateUserInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_FULL_NAME:
      return Object.assign({}, state, {
        fullName: action.fullName,
      });
    case CHANGE_DISPLAY_NAME:
      return Object.assign({}, state, {
        displayName: action.displayName,
      });
    case CHANGE_TITLE:
      return Object.assign({}, state, {
        title: action.title,
      });
    case CHANGE_EMAIL:
      return Object.assign({}, state, {
        email: action.email,
      });
    default:
      return state;
  }
};

export default updateUserInfoReducer;
