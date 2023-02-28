import {
  put,
  call,
  takeLatest,
  all,
  delay,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {WalletActionTypes} from './Action_type';
import {request} from '../../services/service';
import {HTTP_METHODS} from '../../services/api_constants';
import {
  DO_GET_WALLET,
  DO_ADD_WALLET_REQUEST,
} from '../../services/api_end_points';
import {store} from '../../store/configureStore';

function* doAddWidthrawalRequest(action) {
  try {
    const {response} = yield request(
      DO_ADD_WALLET_REQUEST,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doAddWidthrawalRequest', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data,
    );
  } catch (error) {
    console.log('doAddWidthrawalRequest', error.response);
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

export function* doAddWidthrawalRequestWatcher() {
  yield takeEvery(
    WalletActionTypes.ADD_WIDTHRWAL_REQUEST,
    doAddWidthrawalRequest,
  );
}

function* doGetWalletApi(action) {
  try {
    const {response} = yield request(
      DO_GET_WALLET,
      HTTP_METHODS.GET,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doGetWalletApi', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data,
    );
  } catch (error) {
    // yield action.payload.onSuccess(false, 500, 'Something went wrong');

    console.log('doGetWalletApi', error);
    if (error?.response) {
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

export function* doGetWalletApiWatcher() {
  yield takeLatest(WalletActionTypes.GET_WALLET, doGetWalletApi);
}
