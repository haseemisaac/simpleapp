import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = {
  main:{
    gridArea: "main",
    width: "95%",
    height: "95%",
    opacity: "0.9",
    justifySelf: "center",
    alignSelf: "center"
  },
  text:{
    textAlign:"center"
  }
};

class Error extends Component{
  render(){
    const { classes } = this.props;
    return (
      <Paper className={classes.main}>
        <h1 className={classes.text} >You lost bro?.....</h1>    
      </Paper>
      )
  }
}

export default withStyles(styles)(Error);