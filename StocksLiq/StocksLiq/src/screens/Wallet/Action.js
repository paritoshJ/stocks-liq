import {WalletActionTypes} from './Action_type';

export const doAddWalletRequest = ({paramData, onSuccess}) => ({
  type: WalletActionTypes.ADD_WIDTHRWAL_REQUEST,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doGetWallet = ({paramData, onSuccess}) => ({
  type: WalletActionTypes.GET_WALLET,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
