import React from 'react';
import PropTypes from 'prop-types';
import './Counter.component.scss';

Counter.propTypes = {
  value: PropTypes.number,
  increaseFn: PropTypes.func,
  decreaseFn: PropTypes.func
};

function Counter(props) {
  const {value, increaseFn, decreaseFn} = props;

  return (
    <div>
      <button onClick={decreaseFn}>-</button>
      <input value={value} readOnly/>
      <button onClick={increaseFn}>+</button>
    </div>
  );
}

export default Counter;