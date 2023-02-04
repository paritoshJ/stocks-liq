import {
  put,
  call,
  takeLatest,
  all,
  delay,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {ItemActionTypes} from './Action_type';
import {request} from '../../services/service';
import {HTTP_METHODS} from '../../services/api_constants';
import {
  DO_GET_CATEGORY,
  DO_GET_CATEGORY_TYPE,
  DO_GET_SUB_CATEGORY,
  DO_ADD_ITEM,
} from '../../services/api_end_points';
import {store} from '../../store/configureStore';

function* doGetCategory(action) {
  try {
    const {response} = yield request(
      DO_GET_CATEGORY,
      HTTP_METHODS.GET,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doGetCategory', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data?.data,
    );
  } catch (error) {
    console.log('doGetCategory', error);
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

export function* doGetCategoryWatcher() {
  yield takeLatest(ItemActionTypes.DO_GET_CATEGORY, doGetCategory);
}

function* doGetSubCategory(action) {
  try {
    const {response} = yield request(
      DO_GET_SUB_CATEGORY,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doGetSubCategory', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data?.data,
    );
  } catch (error) {
    console.log('doGetSubCategory', error);
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

export function* doGetSubCategoryWatcher() {
  yield takeLatest(ItemActionTypes.DO_GET_SUB_CATEGORY, doGetSubCategory);
}

function* doGetSubCategoryType(action) {
  try {
    const {response} = yield request(
      DO_GET_CATEGORY_TYPE,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doGetSubCategoryType', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data?.data,
    );
  } catch (error) {
    console.log('doGetSubCategoryType', error);
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

export function* doGetSubCategoryTypeWatcher() {
  yield takeLatest(ItemActionTypes.DO_GET_CATEGORY_TYPE, doGetSubCategoryType);
}

function* doAddItem(action) {
  try {
    
    const {response} = yield request(
      DO_ADD_ITEM,
      HTTP_METHODS.POST,
      action.payload.paramData,
      {},
      true,
      store.getState().LoginReducer.bearerToken,
    );
    console.log('doAddItem', response);
    yield action.payload.onSuccess(
      response?.data?.status,
      response.status,
      response?.data,
    );
  } catch (error) {
    console.log('doAddItem', error);
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

export function* doAddItemWatcher() {
  yield takeLatest(ItemActionTypes.DO_ADD_ITEM, doAddItem);
}
