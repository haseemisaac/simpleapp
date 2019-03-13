import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';


import { connect } from 'react-redux' 
import { bindActionCreators } from 'C:/Users/Admin/AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter, Switch } from 'react-router-dom'

import MainPage from './pages/MainPage'
import Login from './pages/Login'
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
    background: "#00b4db", /* fallback for old browsers */
    background: "-webkit-linear-gradient(to right, #00b4db, #0083b0)", /* Chrome 10-25, Safari 5.1-6 */
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
  // main:{
  //   gridArea: "main",
  //   display: "grid",
  //   gridTemplateAreas: `"menu" "content"`,
  //   gridTemplateRows:`50px auto`
  // },
  // menu:{
  //   gridArea: "menu"
  // },
  // content:{
  //   gridArea: "content",
  //   height: '95%',
  //   width:"95%",
  //   opacity: "0.9",
  //   justifySelf: "center",
  //   alignSelf: "center"
    
  // }
};



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0,
    };
    // console.log(this.props)
    setInterval((() => {
      this.props.incrementAction({add: 1})
      // console.log(this.props)
    }).bind(this), 1000)
  }


  
  render(){
    // console.log(this.props)
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar className={classes.header} position="static">
            <Toolbar className={classes.headerToolbar}>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                SimpleApp
              </Typography>
              <Button href="/Login" color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        {/* {MainPage} */}
          <Switch>
            <Route path="/" exact component={MainPage}/>
            <Route path="/Login" exact component={Login}/>
            <Route exact component={Error}/>
          </Switch>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const incrementAction = (data) => {
  return {
    type: "INCREMENT",
    payload: data
  }
}

//Connects the states to props that is sent to this react component
const mapStateToProps = (state) => ({
  count: state.count
})

//Connects the functions to props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({incrementAction}, dispatch)
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));
