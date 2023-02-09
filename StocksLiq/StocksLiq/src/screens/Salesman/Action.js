import {SalesmanActionTypes} from './Action_type';

export const doAddSalesMan = ({paramData, onSuccess}) => ({
  type: SalesmanActionTypes.DO_ADD_SALESMAN,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doGetSalesMan = ({onSuccess}) => ({
  type: SalesmanActionTypes.GET_SALESMAN,
  payload: {
    onSuccess: onSuccess,
  },
});
