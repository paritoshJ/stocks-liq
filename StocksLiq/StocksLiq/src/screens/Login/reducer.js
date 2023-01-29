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

    case LoginActionTypes.SAVE_BEARERTOKEN:
      return {
        ...state,
        bearerToken: action.payload,
      };
    default: {
      return state;
    }
  }
};
export default LoginReducer;
