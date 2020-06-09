import {
  UPDATE_TOKEN,
  UPDATE_CURRENT_USER,
  CHANGE_CHANNEL,
} from "../actions/index";

const initialState = {
  authToken: localStorage.getItem("SLICK_ACCESS_TOKEN"),
  currentUserId: localStorage.getItem("SLICK_CURRENT_USER_ID"),
  activeChannel: "#General",
};

const updateSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return Object.assign({}, state, {
        authToken: action.token,
      });
    case UPDATE_CURRENT_USER:
      return Object.assign({}, state, {
        currentUserId: action.currentUserId,
      });
    case CHANGE_CHANNEL:
      return Object.assign({}, state, {
        activeChannel: action.channel,
      });
    default:
      return state;
  }
};

export default updateSessionReducer;
