import {combineReducers} from 'redux';
import LoginReducer from '../screens/Login/reducer';
import ItemReducer from '../screens/Items/reducer';
import {LoginActionTypes} from '../screens/Login/Action_type';
const appReducer = combineReducers({
  LoginReducer: LoginReducer,
  ItemReducer: ItemReducer,
});
const rootReducer = (state, action) => {
  if (action.type === LoginActionTypes.CLEAR_SESSION) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
export default rootReducer; // (state, action) => rootReducer(state, action); //rootReducer;
