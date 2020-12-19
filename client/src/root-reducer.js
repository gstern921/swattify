import user from "./entities/user/user.reducers";
import { combineReducers } from 'redux';

export default combineReducers({
  user: user,
});
