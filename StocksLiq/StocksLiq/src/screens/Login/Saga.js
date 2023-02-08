import {
  put,
  call,
  takeLatest,
  all,
  delay,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {LoginActionTypes} from './Action_type';
import {request} from '../../services/service';
import {HTTP_METHODS} from '../../services/api_constants';
import {
  DO_LOGOUT,
  DO_SEND_OTP,
  DO_DELETE_USER,
} from '../../services/api_end_points';
import {store} from '../../store/configureStore';

function* sendOtp(action) {
  try {
    const {response} = yield request(
      DO_SEND_OTP,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
    );
    console.log('POST_SEND_OTP', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data,
    );
  } catch (error) {
    if (error.response) {
      if (error.response.status === 500) {
        yield action.payload.onSuccess(
          false,
          error.response.status,
          'Something went wrong',
        );
      } else {
        if (error.response.status !== 401) {
          yield action.payload.onSuccess(
            false,
            error.response.status,
            error.response.data.message
              ? error.response.data.message
              : 'Something went wrong',
          );
        }
      }
    } else {
      yield action.payload.onSuccess(false, 500, 'Something went wrong');
    }
  }
}

export function* postSendOTPWatcher() {
  yield takeLatest(LoginActionTypes.DO_SEND_OTP, sendOtp);
}

function* doLogout(action) {
  console.log('store', store.getState());
  try {
    const {response} = yield request(
      DO_LOGOUT,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('POST_DO_LOGOUT', store.getState().LoginReducer);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data?.message,
    );
  } catch (error) {
    console.log('POST_DO_LOGOUT', error);
    if (error.response) {
      if (error.response.status === 500) {
        yield action.payload.onSuccess(
          false,
          error.response.status,
          'Something went wrong',
        );
      } else {
        if (error.response.status !== 401) {
          yield action.payload.onSuccess(
            false,
            error.response.status,
            error.response.data.message
              ? error.response.data.message
              : 'Something went wrong',
          );
        }
      }
    } else {
      yield action.payload.onSuccess(false, 500, 'Something went wrong');
    }
  }
}

export function* doLogoutWatcher() {
  yield takeLatest(LoginActionTypes.DO_LOGOUT, doLogout);
}
function* doDeleteUser(action) {
  try {
    const {response} = yield request(
      DO_DELETE_USER,
      HTTP_METHODS.GET,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doDeleteUser', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data?.message,
    );
  } catch (error) {
    if (error.response) {
      if (error.response.status === 500) {
        yield action.payload.onSuccess(
          false,
          error.response.status,
          'Something went wrong',
        );
      } else {
        if (error.response.status !== 401) {
          yield action.payload.onSuccess(
            false,
            error.response.status,
            error.response.data.message
              ? error.response.data.message
              : 'Something went wrong',
          );
        }
      }
    } else {
      yield action.payload.onSuccess(false, 500, 'Something went wrong');
    }
  }
}

export function* doDeleteUserWatcher() {
  yield takeLatest(LoginActionTypes.DO_DELETE_USER, doDeleteUser);
}
