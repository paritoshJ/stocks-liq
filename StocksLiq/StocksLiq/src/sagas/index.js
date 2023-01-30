import {all} from 'redux-saga/effects';
import {postSendOTPWatcher} from '../screens/Login/Saga';
import {postVerifyUserWatcher} from '../screens/Otp/Saga';
// Redux saga: Root saga
export function* rootSaga() {
  yield all([postSendOTPWatcher(), postVerifyUserWatcher()]);
}
