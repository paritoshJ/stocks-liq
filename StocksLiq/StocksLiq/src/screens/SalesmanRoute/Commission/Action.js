import {CommissionActionTypes} from './Action_type';

export const doAddCommission = ({paramData, onSuccess}) => ({
  type: CommissionActionTypes.DO_ADD_COMMISSION,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doGetCommission = ({paramData, onSuccess}) => ({
  type: CommissionActionTypes.DO_GET_COMMISSION,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
