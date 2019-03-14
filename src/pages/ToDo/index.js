import React, { Component } from 'react';
import { withStyles, Fab, Icon } from '@material-ui/core'
// import { TrashIcon } from '@material-ui/icon'
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import TabContainer from '../../components/TabContainer'
import CardWrapper from '../../components/CardWrapper'

// import { base, app as firebase } from '../../firebase'

const styles = theme => ({
  floating:{
    position: 'absolute',
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 6,
  }
})

class ToDo extends Component {
  // constructor(props){
  //   super(props)
  // }

  addToDo = () => {

  }

  editToDo = (id) => {

  }

  deleteToDo = (id) => {

  }

  render(){
    const { classes } = this.props;

    return (<div>
      <TabContainer>
          <CardWrapper/>
          <br/>
          <CardWrapper/>
          <br/>
          <CardWrapper/>
          <br/>
          <Fab className={classes.floating} color="secondary">
            <Icon>add</Icon>
          </Fab>
      </TabContainer>
    </div>)
  }
}

export default withStyles(styles, { withTheme: true })(ToDo);