import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "../axios";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {loginUser,init_fav} from '../actions/actions';

import * as EmailValidator from 'email-validator';
import Header from "./header";
import Home from './home';
import Spinner from "./details/spinner";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectState : false,
      error : '',
      spinner : 'none'

    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
isValid(){
  // if(this.state.username === null || this.state.username === '' ){
  //   this.setState({error : ' نام کاربری یا ایمیل خود را وارد کنید'})
  //   return false 
  // }
  // if(this.state.password === null || this.state.password === '' ){
  //   this.setState({error : ' رمز عبور خود را وارد کنید'})
  //   return false
  // }
}
  onSubmit(event) {
    this.setState({spinner:'block'})
    event.preventDefault();
    if(this.isValid){
    this.setState({spinner : 'none'})
    this.props.loginUser( this.state.username , this.state.password);
    this.setState({
      redirectState : true
    })
    
  }
}

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    // console.log(this.props.loginToken ,'usertoken')
    const { redirectState } = this.state;
    return (
      <>
              <Header />

      <div className="login-box">
        <p>ورود به فروشگاه</p>
        <form
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          <label>ایمیل</label>
          <input
            type="text"
            placeholder="نام کاربری یا ایمیل خور را وارد نمایید"
            value={this.state.username}
            onChange={this.onChange}
            name="username"
            required
          />
          

          <label>رمز عبور</label>
          <input
            type="password"
            placeholder="رمز عبور را وارد نمایید"
            value={this.state.password}
            onChange={this.onChange}
            name="password"
            required
          />
          <a href="#">رمز عبور خود را فراموش کرده اید ؟</a>
          <span className="login-error">{this.state.error ? this.state.error.map(e => (
            <p>{e}</p>
          )):null
          }</span>
          <Spinner display={this.state.spinner} />
          <button type="submit">ورود </button>
        </form>
        <div>
          کاربر جدید هستید ؟<Link to={`/user/sign-up`}>ثبت نام کنید </Link>
          <p><Link to={'/'}>صفحه اصلی</Link></p>
        </div>
        {redirectState && <Redirect to={`/`} />}
      </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return { currentUser: state.InitUserReducer.currentUser,
  loginToken : state.InitUserReducer.userToken };
};

const mapDispatchToProps =  {
  loginUser : loginUser,
  setFavourite : init_fav

};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
