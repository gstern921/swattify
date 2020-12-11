import { UserActionTypes } from "../../config/constants";
const initialState = {
  currentUser: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: payload.user };

    default:
      return state;
  }
};

export default userReducer;
