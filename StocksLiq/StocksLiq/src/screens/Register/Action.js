import {SignUpActionTypes} from './Action_type';
export const doSignUpUser = ({paramData, onSuccess}) => ({
  type: SignUpActionTypes.DO_SIGNUP_USER,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
