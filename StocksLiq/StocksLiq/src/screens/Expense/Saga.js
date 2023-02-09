import {
  put,
  call,
  takeLatest,
  all,
  delay,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {ExpenseActionTypes} from './Action_type';
import {request} from '../../services/service';
import {HTTP_METHODS} from '../../services/api_constants';
import {DO_ADD_EXPENSE, DO_GET_EXPENSES} from '../../services/api_end_points';
import {store} from '../../store/configureStore';

function* doAddExpense(action) {
  try {
    const {response} = yield request(
      DO_ADD_EXPENSE,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doAddExpense', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data,
    );
  } catch (error) {
    console.log('doAddExpense', error.response);
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

export function* doAddExpenseWatcher() {
  yield takeLatest(ExpenseActionTypes.DO_ADD_EXPENSES, doAddExpense);
}

function* doGetExpense(action) {
  try {
    const {response} = yield request(
      DO_GET_EXPENSES,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doGetExpense', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data?.data,
    );
  } catch (error) {
    console.log('doGetExpense', error);
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

export function* doGetExpenseWatcher() {
  yield takeLatest(ExpenseActionTypes.GET_EXPENSES, doGetExpense);
}
