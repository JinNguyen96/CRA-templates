import { combineReducers } from 'redux';
import changeValData from './Counter/ChangeVal.reducer';

const RootReducer = combineReducers({
  changeValData
});

export default RootReducer;