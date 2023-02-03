import {ItemActionTypes} from './Action_type';
import I18n from '../../localization/index';
const initialState = {
  userDetails: {},
};
const ItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ItemActionTypes.ADD_ITEM:
      return initialState;

    case ItemActionTypes.EDIT_ITEM:
      return {
        ...state,
      };
    case ItemActionTypes.DELETE_ITEM:
      return {
        ...state,
      };
    case ItemActionTypes.GET_ITEMS:
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
};
export default ItemReducer;
