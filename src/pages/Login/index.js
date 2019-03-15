import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { firebase } from '../../firebase'

import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from '../../components/MySnackbarContentWrapper'

import { connect } from 'react-redux' 
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

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: null,
            password: null,
            open: false,
            errorType: "error",
            errorMessage: "Error has happened"
        }
        // console.log(store)
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

    handleClick = () => {
        this.setState({ open: true });
    };
    
    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        if(this.state.errorType === "success"){
            window.location.href = "/"
        }
        this.setState({ open: false });
    };

    login = () => {
        let {email, password} = this.state
        // let email = this.state.email
        // let password = this.state.password
        // console.log(this.state)
        if(email && password && !(email === "" && password === "")){
            console.log(`${email} | ${password}`)
            
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        errorType:"success",
                        errorMessage:"You have now logged in, you will now be redirected to the main page"
                    })
                    this.handleClick();
                })
                .catch(err => {
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

    handleEnter = (e) => {
        // console.log(e)
        if (e.key === 'Enter') {
            this.login()
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.padding}>
                <h1 style={{textAlign:"center"}}>Login</h1>
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Email" type="email" onChange={(e) => {
                                e.preventDefault()
                                this.setState({
                                    email: e.target.value
                                })
                            }} onKeyPress={(e) => {this.handleEnter(e)}} fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Password" type="password" onChange={(e) => {
                                e.preventDefault()
                                this.setState({
                                    password: e.target.value
                                })
                            }} onKeyPress={(e) => {this.handleEnter(e)}} fullWidth required />
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
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={() => {this.login()}}>Login</Button>
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

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Login));