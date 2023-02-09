import {InventoryActionTypes} from './Action_type';
export const doAddInventory = ({paramData, onSuccess}) => ({
  type: InventoryActionTypes.DO_ADD_INVENTORY,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doGetInventoryProducts = ({paramData, onSuccess}) => ({
  type: InventoryActionTypes.GET_INVENTORY_PRODUCTS,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
