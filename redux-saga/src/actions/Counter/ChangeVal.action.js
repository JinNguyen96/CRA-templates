const changeVal = (type) => ({
  type: 'CHANGE_VAL',
  changeType: type
})

export default {
  changeVal,
  CHANGE_VAL: 'CHANGE_VAL',
  CHANGE_VAL_SUCCESS: 'CHANGE_VAL_SUCCESS',
  CHANGE_VAL_FAILURE: 'CHANGE_VAL_FAILURE'
}