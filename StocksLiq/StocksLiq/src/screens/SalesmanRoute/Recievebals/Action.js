import {RecievableActionTypes} from './Action_type';

export const doAddRecievable = ({paramData, onSuccess}) => ({
  type: RecievableActionTypes.DO_ADD_RECIEVABLES,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doDeleteRecievable = ({paramData, onSuccess}) => ({
  type: RecievableActionTypes.DO_DELETE_RECIEVABLES,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doGetRecievable = ({paramData, onSuccess}) => ({
  type: RecievableActionTypes.GET_RECIEVABLES,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
