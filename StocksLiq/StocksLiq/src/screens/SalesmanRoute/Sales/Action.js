import {SalesActionTypes} from './Action_type';

export const doAddSale = ({paramData, onSuccess}) => ({
  type: SalesActionTypes.DO_ADD_SALES,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doGetSales = ({paramData, onSuccess}) => ({
  type: SalesActionTypes.DO_GET_SALES,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
