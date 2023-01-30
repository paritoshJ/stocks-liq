import {OtpActionTypes} from './Action_type';
export const doVerifyUser = ({mobile_number, otp, onSuccess}) => ({
  type: OtpActionTypes.DO_VERIFY_USER,
  payload: {
    paramData: {mobile_number: mobile_number, otp: otp},
    onSuccess: onSuccess,
  },
});
