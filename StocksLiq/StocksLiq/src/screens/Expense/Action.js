import {ExpenseActionTypes} from './Action_type';

export const doAddExpense = ({paramData, onSuccess}) => ({
  type: ExpenseActionTypes.DO_ADD_EXPENSES,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doGetExpenses = ({paramData, onSuccess}) => ({
  type: ExpenseActionTypes.GET_EXPENSES,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
