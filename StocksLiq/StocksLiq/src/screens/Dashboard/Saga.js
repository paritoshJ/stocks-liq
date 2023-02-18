import {
  put,
  call,
  takeLatest,
  all,
  delay,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {DashbordActionTypes} from './Action_type';
import {request} from '../../services/service';
import {HTTP_METHODS} from '../../services/api_constants';
import {DO_GET_DASHBOARD_VALUES} from '../../services/api_end_points';
import {store} from '../../store/configureStore';

function* doGetDashboardValues(action) {
  try {
    const {response} = yield request(
      DO_GET_DASHBOARD_VALUES,
      HTTP_METHODS.GET,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doGetDashboardValues', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data,
    );
  } catch (error) {
    console.log('doGetDashboardValues', error.response);
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

export function* doGetDashboardValuesWatcher() {
  yield takeLatest(
    DashbordActionTypes.DO_GET_DASHBOARD_VALUES,
    doGetDashboardValues,
  );
}
