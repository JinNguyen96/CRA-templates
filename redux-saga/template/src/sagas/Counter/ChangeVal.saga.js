import {takeLatest, put} from 'redux-saga/effects';
import actionTypes from '../../actions/Counter/ChangeVal.action';

function* changeValueFlow(action) {
  try {    
    yield put({type: actionTypes.CHANGE_VAL_SUCCESS, changeType: action.changeType});
  } catch (err) {
    console.log(err);
    yield put({type: actionTypes.CHANGE_VAL_FAILURE, err});
  }
}

function* changeValueWatcher() {
  yield takeLatest(actionTypes.CHANGE_VAL, changeValueFlow);
}

export default changeValueWatcher;