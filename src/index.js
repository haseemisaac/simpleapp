import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const initialState = {
  count: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case "INCREMENT":
      console.log(action)
      const { add } = action.payload;
      return {
        ...state, //This line copies everything that is currently in the state
        count: (state.count + add)
      }
    default:
      return state;  
  }
};
// The above line is basically the same as function reducer below
// function reducer(state = initialState, action) {
  // switch(action.type){
  //   case "INCREMENT":
  //     return {
  //       count: state.count + 1
  //     }
  //   default:
  //     return state;  
  // }
// }


const store = createStore(reducer);
ReactDOM.render(
  (
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  )
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
