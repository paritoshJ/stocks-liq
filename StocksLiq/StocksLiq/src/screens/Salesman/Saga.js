import {
  put,
  call,
  takeLatest,
  all,
  delay,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {SalesmanActionTypes} from './Action_type';
import {request} from '../../services/service';
import {HTTP_METHODS} from '../../services/api_constants';
import {DO_ADD_SALESMAN, DO_GET_SALESMAN} from '../../services/api_end_points';
import {store} from '../../store/configureStore';

function* doAddsalesman(action) {
  try {
    const {response} = yield request(
      DO_ADD_SALESMAN,
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

export function* doAddsalesmanWatcher() {
  yield takeLatest(SalesmanActionTypes.DO_ADD_SALESMAN, doAddsalesman);
}

function* doGetSalesman(action) {
  try {
    const {response} = yield request(
      DO_GET_SALESMAN,
      HTTP_METHODS.GET,
      {},
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doGetSalesman', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data?.data,
    );
  } catch (error) {
    console.log('doGetSalesman', error);
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

export function* doGetSalesmanWatcher() {
  yield takeLatest(SalesmanActionTypes.GET_SALESMAN, doGetSalesman);
}
