import {ItemActionTypes} from './Action_type';

export const doGetCategory = ({paramData, onSuccess}) => ({
  type: ItemActionTypes.DO_GET_CATEGORY,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doSaveCategory = categoryData => ({
  type: ItemActionTypes.DO_SAVE_CATEGORY,
  payload: {
    categoryData: categoryData,
  },
});

export const doGetSubCategory = ({paramData, onSuccess}) => ({
  type: ItemActionTypes.DO_GET_SUB_CATEGORY,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});

export const doGetSubCategoryType = ({paramData, onSuccess}) => ({
  type: ItemActionTypes.DO_GET_CATEGORY_TYPE,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doAddItem = ({paramData, onSuccess}) => ({
  type: ItemActionTypes.DO_ADD_ITEM,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doGetItems = ({paramData, onSuccess}) => ({
  type: ItemActionTypes.GET_ITEMS,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
