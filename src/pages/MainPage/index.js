import React, { Component } from 'react';
// import './App.css';
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

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

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
    this.state = {
      value: 0
    }
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
                <h2>This app consists of React Router ✔, Material UI ✔, Redux ✔ and Firebase </h2>
                <hr/>
                <h1>Just another counter:</h1>
                <h2>
                  Redux: {this.props.count}
                </h2>
                <h2>
                  Firebase Realtime: {0} Yet to do
                </h2>
              </TabContainer>}
          {value === 1 && 
          //To-Do page area
            <TabContainer>
              Itel;aksdf;kajsd;lkfajs;dlkfjas;lkdfjalks;dfjaslkdfj;alsm Two
            </TabContainer>}
        </Paper>
      </div>)
  }
}

const mapStateToProps = (state) => ({
  count: state.count
})

export default connect(mapStateToProps)(withStyles(styles)(MainPage));