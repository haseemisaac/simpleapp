import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { firebase as app } from '../../firebase'

import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from '../../components/MySnackbarContentWrapper'

import store from '../../store'


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
      gridArea: "main",
      width: "20%",
      height: "30%",
      opacity: "0.8",
      justifySelf: "center",
      alignSelf: "center",
      padding: theme.spacing.unit
    }
});



class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: null,
            password: null,
            open: false,
            errorType: "error",
            errorMessage: "Error has happened"
        }

        const unsub = store.subscribe(() => {
            console.log("changed")
            // console.log()
            const {user} = store.getState();
            if(user){
                window.location.href = "/"
            }
            unsub()
        })
    }

    handleEnter = (e) => {
        // console.log(e)
        if (e.key === 'Enter') {
            this.register()
        }
    }

    register = () => {
        let {email, password} = this.state

        if(email && password && !(email === "" && password === "")){
            console.log(`${email} | ${password}`)
            app.auth().createUserWithEmailAndPassword(email, password)
                .then(res => {
                    console.log(res)
                    this.setState({
                        errorType:"success",
                        errorMessage:"The account has been created, you will now be redirected to the login page"
                    })
                    this.handleClick();
                })
                .catch((err) => {
                    console.log(err)
                    let { message } = err;
                    this.setState({
                        errorType:"error",
                        errorMessage:message
                    })
                    this.handleClick();
                })
        }
    }

    handleClick = () => {
        this.setState({ open: true });
    };
    
    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        if(this.state.errorType === "success"){
            window.location.href = "/Login"
        }
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.padding}>
                <h1 style={{textAlign:"center"}}>Signup</h1>
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Email" type="email" onChange={(e) => {
                                e.preventDefault()
                                // console.log(e.target.value)
                                this.setState({
                                    email: e.target.value
                                })
                            }} onKeyPress={(e) => {this.handleEnter(e)}}  fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="password" label="Password" type="password" onChange={(e) => {
                                e.preventDefault()
                                this.setState({
                                    password: e.target.value
                                })
                            }} onKeyPress={(e) => {this.handleEnter(e)}}  fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                />
                            } label="Remember me" />
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={() => {this.register()}}>Signup</Button>
                    </Grid>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    >
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant={this.state.errorType}
                        message={this.state.errorMessage}
                    />
                </Snackbar>
            </Paper>
        );
    }
}



export default withStyles(styles)(Signup);