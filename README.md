# This is a very simple react app with important concepts

> This app consists of React Router ✔, Material UI ✔, Redux ✔, Firebase Realtime ✔, Firebase Firestore (Need to do) 

Make sure to add config.js to src folder:
```javascript
const config = {
  apiKey: "as;ldkjfa;lksdfj;alksdfja",
  authDomain: "someapp123.firebaseapp.com",
  databaseURL: "https://someapp123.firebaseio.com",
  projectId: "someapp-12321",
  storageBucket: "someapp-123412.appspot.com",
  messagingSenderId: "12341234"
}
export default config;
```

[TOC]


## Screenshots

![Phone1](/screenshot/phone1.PNG)

![Phone2](/screenshot/phone2.PNG)

![Comp1](/screenshot/comp1.png)



![Comp2](/screenshot/comp2.PNG)

> Error 404 Not Found page....

![Comp3](/screenshot/comp3.PNG)

> Sign up with error detection

![Comp4](/screenshot/comp4.PNG)

> Login with error detection

![Comp5](/screenshot/comp5.PNG)

![Comp6](/screenshot/comp6.PNG)



## File Structure

firebase.js has the firebase initialisation code

store.js contains the redux stuff

Work your way from index.js in src folder onto the App.js and you will be fine....

Components folder contains stuff that repeat like Cards....
Pages folder is self-explanatory; bascially the pages....

## Making OOP Classes 
Oh yeah for those that wanted to know how to make classes:

```javascript
class User {
  constructor(username, password){
    //The Underscore is very important!!!
    this._username = username;
    this._password = password;
  }

  // get followed by a space followed by the name... simple...
  get username() {
    //Ill tell you later why we do upper case

    return this._username.toUpperCase();
  }

  // set followed by a space followed by the name... simple...
  set username(username) {
    this._username = username;
  }

  //couldn't be asked to do getters and setters for password

  //Normal functions are like this....
  print(){
    console.log(`username: ${this._username} - password: ${this._password}`)
  }
}

//make sure to do the export
export default User;
```
> You need inheritance; look no further

```javascript
//Make sure to import the parent class
import User from './User';

class Admin extends User{
  constructor(username, password){
    // If you don't know why we use super.... cba to explain
    super(username, password)
  }
}

//again don't forget the export
export default Admin;
```
> Now actually using the program...

```javascript
//Make sure to first import the classes
import User from './User';
import Admin from  './Admin';

//Somewhere in your program....

let bob = new User("bob", "asdfasd");
let charlie = new Admin("charlie", "asdfa");

//Now here is the tricky part...

// -- Using getters
let username = bob.username; //not bob.username() or bob.getUsername()
// And if you remember the code this should return the username in uppercase
// -- using Setters
bob.username = "bob2";

// -- using the functions
bob.print();

```

## Firebase Setup
> Make sure you have the following done on the firebase console side
* [FirebaseConsole](https://console.firebase.google.com/u/0/) - Firebase Console
### Getting config.js
These are the steps:
1. Click Settings icon on the left hand side bar
2. Click "General" tab go to the bottom of it and click </> button
3. Copy the config code and match it with the first picture in this readme file


### Activating Firebase Auth - Enabling Email/Password 
Go to Authentication bar then Sign-In method tab and make sure you have Email/Password Enabled as shown below and click Save 
![FirebaseAuth](/screenshot/firebase1.png)

### Realtime Database Creation
Go to the Database bar then Data tab and make sure the Realtime Database is activated
![FirebaseRealtime](/screenshot/firebase2.png)

### Setting Security Rules for Realtime Database
Go to the Rule tab make sure it matches the following. This is not a secure way but for development; it prevents firebase from blocking unauthorised access so for now its ok
![FirebaseSecurity](/screenshot/firebase3.png)

## Firebase Functions 
> These are some of the functions used in this app from the firebase library

```javascript
// This is used to sign the user in
firebase.auth().signInWithEmailAndPassword(email, password)

// This is used to sign up
firebase.auth().createUserWithEmailAndPassword(email, password)

// This is used to check the current logged in user
firebase.auth().onAuthStateChanged(user => {
  if(user){
    console.log("Logged in")
    // now I can do something with the user
    // user.uid will return the user's unique identifier
  } else {
    // No current user
    console.log("Not Logged In")
  }
})
```

## Redux - store.js
> Redux is usually very complicated but lets bring it down a notch
Keywords:
  - Store
  - Reducer
  - Dispatch

### Store
> Think of store as a place where you store jk... 

> Think of it like a global state; so it is just like any other state but there is only one of it and it is accessible everywhere in the app

Three things you need to know about the store:
  - initialState
  - getState()
  - subscribe

#### initialState
> This is what you want the state to be when the app starts

Example:
```javascript
initialState = {
  count: 0
}
```

#### getState()
> Returns an object with all the variables in the state

#### subscribe
> Subscribe is a listener that takes a function and runs the function everytime there is a change in the states. It returns unsubscribe function to stop listening when that is called

Example:
```javascript
const unsub = store.subscribe(() => {
            console.log("changed")
            //Prints  store
            console.log(store.getState());
            unsub()
        })

```

### Dispatch
> When user wants to set state they call dispatch and send data in this format

```javascript

const action = {
  type: "INCREMENT", //This is used to identify what the user wants to change <- used by reducer
  payload: { //payload is usually an object like this one has an attribute add and value that you want to add
    add: 2 
  }
};

store.dispatch(action) //call store.dispatch and send the action
```


### Reducer
> This is basically like handle dispatch so it tells the store what to do when someone wants to make a change

Example:
```javascript
// state=initialState sets state to initialState if it is not provided; so at the start state isn't provided so by default it would be initialState
const reducer = (state = initialState, action) => {
  switch(action.type){
    case "INCREMENT":
      // console.log(action) 
      const { add } = action.payload; //This takes the payload and just picks "add"
      return {
        ...state, //This line copies everything that is currently in the state
        count: (state.count + add) //count = state.count + add <- this is what it does
      }
    default: // you need to have a default !!!!
      return state;  //If you are not doing any of the above cases then just return the state like normal 
  }
};
```

## MaterialUI
> Look at thier documenation its way better than mine and it also has examples :-)

## Built With

* [React.js](https://reactjs.org/) - ReactJS
* [Redux](https://redux.js.org/) - Redux
* [Firebase](https://firebase.google.com/) - Firebase
* [MaterialUI](https://material-ui.com/) - MaterialUI

## Author

* **Haseem Isaac** - [Haseem Isaac](https://github.com/haseemisaac)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details