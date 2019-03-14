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
## Structure
firebase.js has the firebase initialisation code

store.js contains the redux stuff

Work your way from index.js in src folder onto the App.js and you will be fine....

Components folder contains stuff that repeat like Cards....
Pages folder is self-explanatory; bascially the pages....

## Making Classes 
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


