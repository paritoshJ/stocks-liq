import {LoginActionTypes} from './Action_type';
export const doSendOtp = ({mobile_number, onSuccess}) => ({
  type: LoginActionTypes.DO_SEND_OTP,
  payload: {
    paramData: {mobile_number: mobile_number},
    onSuccess: onSuccess,
  },
});

export const doSaveUser = userDetail => ({
  type: LoginActionTypes.SAVE_USER,
  payload: userDetail,
});
export const setLoggedIn = isLogin => ({
  type: LoginActionTypes.IS_LOGGED_IN,
  payload: isLogin,
});
export const doLogout = ({paramData, onSuccess}) => ({
  type: LoginActionTypes.DO_LOGOUT,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doDeleteUser = ({paramData, onSuccess}) => ({
  type: LoginActionTypes.DO_DELETE_USER,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doClearSession = paramData => ({
  type: LoginActionTypes.CLEAR_SESSION,
  payload: paramData,
});
export const doSaveToken = paramData => ({
  type: LoginActionTypes.SAVE_BEARERTOKEN,
  payload: {
    token: paramData
  },
});
