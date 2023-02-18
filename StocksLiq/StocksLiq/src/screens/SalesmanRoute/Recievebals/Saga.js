import {
  put,
  call,
  takeLatest,
  all,
  delay,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {RecievableActionTypes} from './Action_type';
import {request} from '../../../services/service';
import {HTTP_METHODS} from '../../../services/api_constants';
import {
  DO_ADD_BHEJAN,
  DO_DELETE_BHEJAN,
  DO_GET_BHEJAN,
} from '../../../services/api_end_points';
import {store} from '../../../store/configureStore';

function* doAddRecievable(action) {
  try {
    const {response} = yield request(
      DO_ADD_BHEJAN,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doAddsalesman', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data,
    );
  } catch (error) {
    console.log('doAddsalesman', error.response);
    if (error.response) {
      if (error.response.status === 500) {
        yield action.payload.onSuccess(false, error.response.status, {
          message: 'Something went wrong',
        });
      } else {
        if (error.response.status !== 401) {
          yield action.payload.onSuccess(false, error.response.status, {
            message: error.response.data.message
              ? error.response.data.message
              : 'Something went wrong',
          });
        }
      }
    } else {
      yield action.payload.onSuccess(false, 500, {
        message: 'Something went wrong',
      });
    }
  }
}

export function* doAddRecievableWatcher() {
  yield takeLatest(RecievableActionTypes.DO_ADD_RECIEVABLES, doAddRecievable);
}

function* doGetRecievable(action) {
  try {
    const {response} = yield request(
      DO_GET_BHEJAN,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doGetBhejan', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data?.data,
    );
  } catch (error) {
    console.log('doGetBhejan', error);
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

export function* doGetRecievableWatcher() {
  yield takeLatest(RecievableActionTypes.GET_RECIEVABLES, doGetRecievable);
}

function* doDeleteRecievable(action) {
  try {
    const {response} = yield request(
      DO_DELETE_BHEJAN,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doDeleteSalesman', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data,
    );
  } catch (error) {
    console.log('doDeleteBhejan', error);
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

export function* doDeleteRecievableWatcher() {
  yield takeLatest(
    RecievableActionTypes.DO_DELETE_RECIEVABLES,
    doDeleteRecievable,
  );
}
