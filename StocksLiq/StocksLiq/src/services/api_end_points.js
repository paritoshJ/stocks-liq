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
export const DO_GET_PROFILE = `${API_DOMAIN_QA}/get-profile`;
export const DO_EDIT_PROFILE = `${API_DOMAIN_QA}/edit-profile`;

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
