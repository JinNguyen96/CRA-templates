import actionTypes from '../../actions/Counter/ChangeVal.action';

const initState = {
  countVal: 0
};

const decreaseValReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_VAL: 
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.CHANGE_VAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countVal: action.changeType === 'inc' ? state.countVal + 1 : state.countVal - 1
      };
    case actionTypes.CHANGE_VAL_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}

export default decreaseValReducer;