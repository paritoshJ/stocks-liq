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
  doChangeLanguageWatcher,
} from '../screens/Profile/Saga';
import {
  doGetExpenseWatcher,
  doAddExpenseWatcher,
} from '../screens/Expense/Saga';
import {
  doAddsalesmanWatcher,
  doGetSalesmanWatcher,
  doDeleteSalesmanWatcher,
} from '../screens/Salesman/Saga';
import {
  doGetCategoryWatcher,
  doGetSubCategoryWatcher,
  doGetSubCategoryTypeWatcher,
  doAddItemWatcher,
  doGetItemsWatcher,
} from '../screens/Items/Saga';
import {
  doGetInventoryProductsWatcher,
  doAddInventoryWatcher,
} from '../screens/Inventory/Saga';
import {
  doAddSalesWatcher,
  doGetSalesWatcher,
} from '../screens/SalesmanRoute/Sales/saga';
import {
  doAddCommissionWatcher,
  doGetCommissionWatcher,
} from '../screens/SalesmanRoute/Commission/saga';
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
    doGetCategoryWatcher(),
    doGetSubCategoryWatcher(),
    doGetSubCategoryTypeWatcher(),
    doAddItemWatcher(),
    doGetItemsWatcher(),
    doGetInventoryProductsWatcher(),
    doAddInventoryWatcher(),
    doAddExpenseWatcher(),
    doGetExpenseWatcher(),
    doAddsalesmanWatcher(),
    doGetSalesmanWatcher(),
    doDeleteSalesmanWatcher(),
    doAddSalesWatcher(),
    doGetSalesWatcher(),
    doAddCommissionWatcher(),
    doGetCommissionWatcher(),
    doChangeLanguageWatcher(),
  ]);
}
