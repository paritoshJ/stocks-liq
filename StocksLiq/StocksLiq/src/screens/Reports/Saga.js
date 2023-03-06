import {
  put,
  call,
  takeLatest,
  all,
  delay,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {ReporActionTypes} from './Action_type';
import {request} from '../../services/service';
import {HTTP_METHODS} from '../../services/api_constants';
import {
  DO_GET_REPORTS,
  DO_GET_REPORT_DETAIL,
} from '../../services/api_end_points';
import {store} from '../../store/configureStore';

function* getUserReport(action) {
  try {
    const {response} = yield request(
      DO_GET_REPORTS,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('getUserReport', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data?.status ? response?.data : response?.data?.message,
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

export function* postUserReportWatcher() {
  yield takeLatest(ReporActionTypes.GET_REPORTS, getUserReport);
}

function* getUserReportDetails(action) {
  try {
    const {response} = yield request(
      DO_GET_REPORT_DETAIL,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('getUserReport', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data?.status ? response?.data : response?.data?.message,
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

export function* postUserReportDetailsWatcher() {
  yield takeLatest(ReporActionTypes.GET_REPORT_DETAILS, getUserReportDetails);
}