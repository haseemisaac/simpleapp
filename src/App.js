import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux' 
import store from './store'
import { app } from './firebase'

import { Route } from "react-router-dom";
import { withRouter, Switch } from 'react-router-dom'

import MainPage from './pages/MainPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Error from './pages/Error'
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
  root: {
    display: "grid",
    gridTemplateAreas: `"header"
                        "main"`,
    gridTemplateRows:"64px auto" ,
    flexGrow: 1,
    height: "100%",
    background: "linear-gradient(to right, #00b4db, #0083b0)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  },
  grow: {
    flexGrow: 1,
    textAlign:"center"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  header:{
    gridArea: "header"
  },
  headerToolbar:{

    
  }
};



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0,
      loggedIn: false,
      fireCounter: 0
    };

    const unsub = store.subscribe(() => {
      console.log("changed")
      // console.log()
      const {user} = store.getState();
      if(user){
          this.setState({
            loggedIn:true
          })
      }
      // this.getCount(user.uid)
      unsub()
    })
    
    // console.log(this.props)
    
  }


  
  render(){
    // console.log(this.props)
    const { classes } = this.props;
    const notLoggedIn = (
      <div>
              <Button href="/Signup" variant="contained" color="secondary">Signup</Button>
              &nbsp;&nbsp;
              <Button href="/Login" variant="contained" color="secondary">Login</Button>
      </div>
    )

    const signOut = (
      <Button onClick={() => {
        app.auth().signOut();
        window.location.href = "/"
      }} variant="contained" color="secondary">Signout</Button>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.header} position="static">
            <Toolbar className={classes.headerToolbar}>
              <Typography variant="h4" color="inherit" className={classes.grow}>
                SimpleApp
              </Typography>
              {this.state.loggedIn ? signOut : notLoggedIn}
            </Toolbar>
        </AppBar>
          <Switch>
            <Route path="/" exact component={MainPage}/>
            <Route path="/Login" exact component={Login}/>
            <Route path="/Signup" exact component={Signup}/>
            <Route exact component={Error}/>
          </Switch>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withRouter(connect()(withStyles(styles)(App)));
