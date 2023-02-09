import {ExpenseActionTypes} from './Action_type';
import I18n from '../../localization/index';
const initialState = {
  expenseTypeArray: [
    {label: I18n.t('initialtext'), value: 'initial'},
    {label: I18n.t('regularText'), value: 'Regular'},
  ],
};
const ExpenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ExpenseActionTypes.DO_ADD_EXPENSES:
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
};
export default ExpenseReducer;
