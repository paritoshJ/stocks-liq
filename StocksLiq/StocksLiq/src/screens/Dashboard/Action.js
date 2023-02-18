import {DashbordActionTypes} from './Action_type';


export const doGetDashbordValues = ({paramData, onSuccess}) => ({
  type: DashbordActionTypes.DO_GET_DASHBOARD_VALUES,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
