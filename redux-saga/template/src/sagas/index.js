import { all } from 'redux-saga/effects';
import ChangeVal from './Counter/ChangeVal.saga';

const RootSaga = function* () {
  yield all([
    ChangeVal()
  ]);
};

export default RootSaga;