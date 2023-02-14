import {BhejaActionTypes} from './Action_type';

export const doAddBhejan = ({paramData, onSuccess}) => ({
  type: BhejaActionTypes.DO_ADD_BHEJAN,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doDeleteBhejan = ({paramData, onSuccess}) => ({
  type: BhejaActionTypes.DO_DELETE_BHEJAN,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doGetBhejan = ({paramData, onSuccess}) => ({
  type: BhejaActionTypes.GET_BHEJAN,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
