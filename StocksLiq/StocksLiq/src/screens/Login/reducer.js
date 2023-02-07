import {LoginActionTypes} from './Action_type';
import I18n from '../../localization/index';
const initialState = {
  loading: true,
  isLoggedIn: false,
  bearerToken: '',
  userDetails: {},
};
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginActionTypes.CLEAR_SESSION:
      return initialState;

    case LoginActionTypes.SAVE_USER:
      return {
        ...state,
        userDetails: action.payload,
      };
    case LoginActionTypes.IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case LoginActionTypes.SAVE_BEARERTOKEN:
      return {
        ...state,
        bearerToken: action?.payload?.token,
      };
    default: {
      return state;
    }
  }
};
export default LoginReducer;
