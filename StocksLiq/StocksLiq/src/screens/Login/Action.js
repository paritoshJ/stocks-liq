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
