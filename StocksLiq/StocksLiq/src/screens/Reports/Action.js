import {ReporActionTypes} from './Action_type';
export const doGetUserReport = ({paramData, onSuccess}) => ({
  type: ReporActionTypes.GET_REPORTS,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
export const doGetUserReportDetails = ({paramData, onSuccess}) => ({
  type: ReporActionTypes.GET_REPORT_DETAILS,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});

export const doGetDownloadPdf = ({paramData, onSuccess}) => ({
  type: ReporActionTypes.GET_DOWNLOAD_PDF,
  payload: {
    paramData: paramData,
    onSuccess: onSuccess,
  },
});
