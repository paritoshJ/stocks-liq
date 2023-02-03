import {ProfileActionTypes} from './Action_type';

export const doGetUserProfile = ({paramData, onSuccess}) => ({
  type: ProfileActionTypes.DO_GET_PROFILE,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doEditUserProfile = ({paramData, onSuccess}) => ({
  type: ProfileActionTypes.DO_EDIT_PROFILE,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
