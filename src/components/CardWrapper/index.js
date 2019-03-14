import React, { Component } from 'react';
import {Card, CardActions, CardContent, withStyles, Fab, Icon } from '@material-ui/core'

const styles = theme => ({
  Todo: {
    // Some CSS
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    // height: 48,
    // padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    display: "flex",
    justifyContent: "space-between",
    padding:"15px"
  },
  content:{

  },
})

class CardWrapper extends Component{
  render(){
    const { classes } = this.props;
    return(
      <Card className={classes.Todo}>
            <CardContent className={classes.content}>
                <h2>Example....</h2>
            </CardContent>
            <CardActions>
            <Fab color="secondary" aria-label="Edit" className={classes.fab}>
              <Icon>edit</Icon>
            </Fab>
            <Fab color="primary" aria-label="Delete" className={classes.fab}>
              <Icon>delete</Icon>
            </Fab>
            </CardActions>
       </Card>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CardWrapper);