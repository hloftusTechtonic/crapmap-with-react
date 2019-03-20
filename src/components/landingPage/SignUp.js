import React, { Component } from 'react';
// import { FirebaseContext } from '../../firebase';
import {auth} from './../../firebase.js'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab'
import LineDivider from '../addEditPin/LineDivider.js';

import store from '../../redux/store'
import {registerUser} from '../../redux/actions/userActions'

import {NavLink, Redirect } from 'react-router-dom';


const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE, 
      open: false,
      scroll: 'paper',};
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });

  };

  doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  
  doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => auth.signOut();

  doPasswordReset = email => auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    auth.currentUser.updatePassword(password);

  // isAuthentic() {
  //   let status;
  //   if(0 = 0){
  //     status =  true;
  //   } else {
  //     status =  false;
  //   }
  //   return status
  // }

  onSubmit = event => {
    const { email, passwordOne } = this.state;
      this.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        var actionObject = {
          userID: authUser.user.uid,
          // auth: isAuthentic()
          auth: true
        }
        store.dispatch(registerUser(actionObject));
        this.props.sendData(authUser);

        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });


    // event.preventDefault();

  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    
 

    return (
      <div>
        <Fab color="error" style={{ width: 210, borderRadius: 4, margin: 10, opacity: 1 }} onClick={this.handleClickOpen('paper')}>Sign-Up/Login with Email</Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
          style={{ 'z-index': 30, 'background-color': 'primary' }}>
          <DialogTitle>
            SIGN UP
          </DialogTitle>
          <LineDivider />
          <DialogContent>
            <form onSubmit={this.onSubmit}>
              <TextField
                id="outlined-name"
                label="Username"
                margin="normal"
                variant="outlined"
                value={username}
                onChange={this.onChange}
                placeholder="Username"
                name="username"
              />
              <TextField
                id="outlined-name"
                label="Email"
                margin="normal"
                variant="outlined"
                value={email}
                onChange={this.onChange}
                placeholder="Email Address"
                name="email"
              />
              <TextField
                id="outlined-name"
                label="Password"
                margin="normal"
                variant="outlined"
                value={passwordOne}
                onChange={this.onChange}
                placeholder="Enter Password"
                name="passwordOne"
              />
              <TextField
                id="outlined-name"
                label="Confirm Password"
                margin="normal"
                variant="outlined"
                value={passwordTwo}
                onChange={this.onChange}
                placeholder="Confirm Password"
                name="passwordTwo"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onSubmit} disabled={isInvalid} type="submit" color="primary">Sign-Up</Button>
            <Button onClick={this.handleClose} color="error">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default SignUpForm;