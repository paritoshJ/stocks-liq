import {ItemActionTypes} from './Action_type';
import I18n from '../../localization/index';
const initialState = {
  categoryData: [],
};
const ItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ItemActionTypes.ADD_ITEM:
      return {
        ...state,
      };

    case ItemActionTypes.EDIT_ITEM:
      return {
        ...state,
      };
    case ItemActionTypes.DELETE_ITEM:
      return {
        ...state,
      };
    case ItemActionTypes.DO_SAVE_CATEGORY:
      return {
        ...state,
        categoryData: action?.payload?.categoryData,
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
