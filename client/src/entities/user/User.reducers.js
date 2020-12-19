import { UserActionTypes } from "./constants";
const initialState = {
  currentUser: null,
  loginPending: false,
  errorMessage: null,
  logoutPending: false,
  logoutError: false
};

const {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CHECK_LOGIN_STATUS_PENDING,
  CHECK_LOGIN_STATUS_SUCCESS,
  CHECK_LOGIN_STATUS_FAILURE,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} = UserActionTypes;

const userReducer = (state = initialState, { type, payload }) => {
  
  switch (type) {
    case LOGIN_PENDING:
      return { ...state, loginPending: true, errorMessage: null};

    case LOGIN_SUCCESS:
    return { ...state, loginPending: false, currentUser: payload, errorMessage: null}

    case LOGIN_FAILURE:
      return { ...state, loginPending: false, currentUser: null, errorMessage: payload}

    case LOGOUT_PENDING:
      return { ...state, logoutPending: true, errorMessage: null};

    case LOGOUT_SUCCESS:
    return { ...state, logoutPending: false, currentUser: null, errorMessage: null}

    case LOGOUT_FAILURE:
      return { ...state, logoutPending: false, errorMessage: payload}
    
    case CHECK_LOGIN_STATUS_PENDING:
      return { ...state, loginPending: true, errorMessage: null }

    case CHECK_LOGIN_STATUS_SUCCESS:
      
      return { ...state, loginPending: false, currentUser: payload, errorMessage: null }

    case CHECK_LOGIN_STATUS_FAILURE:
      return { ...state, loginPending: false, currentUser: null, errorMessage: null }
    
    case REGISTER_PENDING:
      return { ...state, loginPending: true, errorMessage: null }

    case REGISTER_SUCCESS:
      return { ...state, loginPending: false, currentUser: payload, errorMessage: null }

    case REGISTER_FAILURE:
      return { ...state, loginPending: false, currentUser: null, errorMessage: payload }

    default:
      return state;
  }
};

export default userReducer;
