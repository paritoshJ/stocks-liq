import {api_environments} from './api_environments';
import {dateFormate, CNSTNT} from '../util/globalMethods';
let envi = 'API_DOMAIN_QA';
export function getBaseURL() {
  return api_environments[envi];
}
const API_DOMAIN_QA = getBaseURL();
export const DO_SEND_OTP = `${API_DOMAIN_QA}/send-otp`;
export const DO_VERIFY_USER = `${API_DOMAIN_QA}/verify-user`;
export const DO_LOGIN = `${API_DOMAIN_QA}/login`;
export const DO_SIGNUP = `${API_DOMAIN_QA}/sign-up`;
export const DO_LOGOUT = `${API_DOMAIN_QA}/logout`;
export const DO_DELETE_USER = `${API_DOMAIN_QA}/delete-account`;
export const DO_GET_PROFILE = `${API_DOMAIN_QA}/get-profile`;
export const DO_EDIT_PROFILE = `${API_DOMAIN_QA}/edit-profile`;
export const DO_GET_CATEGORY = `${API_DOMAIN_QA}/getcategories`;
export const DO_GET_CATEGORY_TYPE = `${API_DOMAIN_QA}/gettype`;
export const DO_GET_SUB_CATEGORY = `${API_DOMAIN_QA}/getsubcategories`;
export const DO_ADD_ITEM = `${API_DOMAIN_QA}/additem`;
export const GET_ITEMS = `${API_DOMAIN_QA}/item-list`;
export const DO_ADD_INVENTORY = `${API_DOMAIN_QA}/add-inventory`;
export const GET_INVENTORY_PRODUCTS = `${API_DOMAIN_QA}/inventory-item-list`;
export const DO_ADD_EXPENSE = `${API_DOMAIN_QA}/add-expenses`;
export const DO_GET_EXPENSES = `${API_DOMAIN_QA}/get-expenses`;
export const DO_ADD_SALESMAN = `${API_DOMAIN_QA}/add-salesman`;
export const DO_GET_SALESMAN = `${API_DOMAIN_QA}/get-salesman`;
export const DO_DELETE_SALESMAN = `${API_DOMAIN_QA}/delete-salesman`;
export const DO_ADD_SALES = `${API_DOMAIN_QA}/add-sales`;
export const DO_GET_SALES = `${API_DOMAIN_QA}/get-sales`;
export const DO_ADD_COMMISSION = `${API_DOMAIN_QA}/add-commission`;
export const DO_GET_COMMISSION = `${API_DOMAIN_QA}/get-commission`;
export const DO_CHANGE_LANGUAGE = `${API_DOMAIN_QA}/change-langcode`;
export const DO_ADD_BHEJAN = `${API_DOMAIN_QA}/add-bhejan`;
export const DO_GET_BHEJAN = `${API_DOMAIN_QA}/get-bhejan`;
export const DO_GET_DASHBOARD_VALUES = `${API_DOMAIN_QA}/dashboard-data`;
export const DO_ADD_WALLET_REQUEST = `${API_DOMAIN_QA}/add-withdraw-request`;
export const DO_GET_WALLET = `${API_DOMAIN_QA}/get-wallet`;
export const DO_GET_REPORTS = `${API_DOMAIN_QA}/report-data`;
export const DO_GET_REPORT_DETAIL = `${API_DOMAIN_QA}/report-item-detail`;
export const DO_GET_DOWNLOAD_PDF = `${API_DOMAIN_QA}/download-pdf`;

// export const GET_CLAIM_STATUS_SUMMERY = (
//   memberType,
//   memberOid,
//   dateFrom,
//   dateTo,
// ) =>
//   `${API_DOMAIN_QA}/claim/claimsummary/membertype/${memberType}/oid/${memberOid}/incurreddatefrom/${dateFrom}/incurreddateto/${dateTo}?cb=${Date.now()}`;
// export const GET_CLAIM_LIST = (url, pageNumber) => {
//   return `${getBaseURL()}/claim/searchclaims/membertype/${url}/pageNumber/${pageNumber}/AdminCenter/false/uienable/false?cb=${Date.now()}`;
// };
