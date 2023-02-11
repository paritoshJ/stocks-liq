import {SalesmanActionTypes} from './Action_type';

export const doAddSalesMan = ({paramData, onSuccess}) => ({
  type: SalesmanActionTypes.DO_ADD_SALESMAN,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doDeleteSalesMan = ({paramData, onSuccess}) => ({
  type: SalesmanActionTypes.DO_DELETE_SALESMAN,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doGetSalesMan = ({paramData, onSuccess}) => ({
  type: SalesmanActionTypes.GET_SALESMAN,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
