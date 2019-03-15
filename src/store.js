import { createStore } from 'redux'
import { firebase } from './firebase'

const initialState = {
  count: 0,
  user: null
}

const reducer = (state = initialState, action) => {
  // console.log(action)
  switch(action.type){
    case "INCREMENT":
      // console.log(action)
      const { add } = action.payload;
      return {
        ...state, //This line copies everything that is currently in the state
        count: (state.count + add)
      }
    case "USER":
    
      const { user }  = action.payload;
      // console.log("action")
      // console.log(action)
      return {
        ...state,
        user
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

firebase.auth().onAuthStateChanged(user => {
  if(user){
    console.log("User added to redux")
    store.dispatch({
      type: "USER",
      payload: { user }
    })
  } else {
    console.log("Not Logged In")
  }
})

export default store;