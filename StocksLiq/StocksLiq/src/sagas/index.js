import {all} from 'redux-saga/effects';
import {
  postSendOTPWatcher,
  doLogoutWatcher,
  doDeleteUserWatcher,
} from '../screens/Login/Saga';
import {postVerifyUserWatcher, postLoginUserWatcher} from '../screens/Otp/Saga';
import {postSignUpUserWatcher} from '../screens/Register/Saga';
import {
  doGetProfileWatcher,
  doEditProfileWatcher,
} from '../screens/Profile/Saga';
// Redux saga: Root saga
export function* rootSaga() {
  yield all([
    postSendOTPWatcher(),
    doDeleteUserWatcher(),
    postVerifyUserWatcher(),
    postSignUpUserWatcher(),
    postLoginUserWatcher(),
    doLogoutWatcher(),
    doGetProfileWatcher(),
    doEditProfileWatcher(),
  ]);
}
