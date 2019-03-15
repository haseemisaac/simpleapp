import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Paper } from '@material-ui/core';

import store from '../../store'
import { firebase } from '../../firebase'

import { connect } from 'react-redux' 
import { bindActionCreators } from 'redux'

import TabContainer from '../../components/TabContainer'
import ToDo from '../ToDo'

const styles = {
  main:{
    gridArea: "main",
    display: "grid",
    gridTemplateAreas: `"menu" "content"`,
    gridTemplateRows:`50px auto`
  },
  menu:{
    gridArea: "menu"
  },
  content:{
    gridArea: "content",
    height: '95%',
    width:"95%",
    opacity: "0.9",
    justifySelf: "center",
    alignSelf: "center"
    
  }
};

class MainPage extends Component {
  constructor(props){
    super(props);
    console.log("store:")
    console.log(store.getState())
    this.state = {
      value: 0,
      loggedIn: false,
      fireCount: 0
    }

    const unsub = store.subscribe(() => {
      console.log("changed")
      // console.log()
      const {user} = store.getState();
      if(user){
          this.setState({
            loggedIn:true
          })
          this.getCount(user.uid)
          unsub()
      }
    })

    console.log("I am here")

    setInterval((() => {
      this.props.incrementAction({add: 1})
      // console.log(this.props)
    }), 1000)
  }

  getCount = (userId) => {
    //get Counter from firebase real time database
    //or create on if it doesn't exist
    const db = firebase.database();

    db.ref('counters/' + userId).once("value", data => {
        if(data.exists()){
          const val = data.val().count;
          // console.log(val)
          db.ref('counters/' + userId).set({
            count: val+1
          })
          db.ref('counters/' + userId).on("value", snap => {
            this.setState({
              fireCount: snap.val().count
            })
          })
        } else {
          db.ref('counters/' + userId).set({
           count: 0
          });
        }
    })
    // console.log(isThere)
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render(){
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.main}>
        <AppBar className={classes.menu} position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="primary"
            centered
          >
            <Tab label="Home" />
            <Tab label="To-Do" />
          </Tabs>
        </AppBar>
        <Paper className={classes.content}>
          {value === 0 && 
          // Try to put this in another page
              <TabContainer>
                <h1>This is a simple react app</h1>
                <h2>This app consists of React Router ✔, Material UI ✔, Redux ✔, Firebase Realtime ✔, Firebase Firestore (Need to do) </h2>
                <hr/>
                <h1>Just another counter:</h1>
                <h2>
                  Redux: {this.props.count}
                </h2>
                {this.state.loggedIn && 
                <h2>
                  Firebase Realtime: {this.state.fireCount}
                </h2>}
              </TabContainer>}
          {value === 1 && (this.state.loggedIn ?
          //To-Do page area
            <ToDo/> : <h1 style={{textAlign:"center"}}>Please Login in order to access To-Do Section...</h1>)
          }
        </Paper>
      </div>)
  }
}


const incrementAction = (data) => {
  return {
    type: "INCREMENT",
    payload: data
  }
}

const mapStateToProps = (state) => ({
  count: state.count
})

//Connects the functions to props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({incrementAction}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainPage));