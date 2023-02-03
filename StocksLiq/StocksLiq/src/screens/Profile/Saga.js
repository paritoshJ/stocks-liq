import {
  put,
  call,
  takeLatest,
  all,
  delay,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {ProfileActionTypes} from './Action_type';
import {request} from '../../services/service';
import {HTTP_METHODS} from '../../services/api_constants';
import {DO_GET_PROFILE, DO_EDIT_PROFILE} from '../../services/api_end_points';
import {store} from '../../store/configureStore';

function* doGetProfile(action) {
  try {
    const {response} = yield request(
      DO_GET_PROFILE,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doGetProfile', store.getState().LoginReducer);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data?.message,
    );
  } catch (error) {
    console.log('doGetProfile', error);
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

export function* doGetProfileWatcher() {
  yield takeLatest(ProfileActionTypes.DO_GET_PROFILE, doGetProfile);
}

function* doEditProfile(action) {
  try {
    const {response} = yield request(
      DO_EDIT_PROFILE,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doGetProfile', response?.data);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data,
    );
  } catch (error) {
    console.log('doGetProfile', error);
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

export function* doEditProfileWatcher() {
  yield takeLatest(ProfileActionTypes.DO_EDIT_PROFILE, doEditProfile);
}
