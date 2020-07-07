import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Counter from './components/Counter/Counter.component';
import {useSelector, useDispatch} from 'react-redux';
import changeValAction from './actions/Counter/ChangeVal.action';

function App(props) {
  const dispatch = useDispatch();
  const {countVal} = useSelector(state => state.changeValData);

  const onClickIncrease = () => {
    dispatch(changeValAction.changeVal('inc'));
  }

  const onClickDecrease = () => {
    dispatch(changeValAction.changeVal('dec'));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br/>
        <span>Counter:</span>
        <Counter 
          value={countVal}
          increaseFn={onClickIncrease}
          decreaseFn={onClickDecrease}
        />
      </header>
    </div>
  );
}

export default App;
