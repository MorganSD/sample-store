import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "../axios";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Home from './home';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectState : false

    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    axios
      .post("/auth/jwt/login/", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
      
        localStorage.setItem("jwtToken", JSON.stringify(res.data.data));
      })
      // .then(this.props.loginUser()).then(alert('login sucsess')).then(this.setState({
      //   redirectState:true
      // })).catch(console.error()
      // );
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { redirectState } = this.state;
    return (
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
            placeholder="نام کاربری خور را وارد نمایید"
            value={this.state.email}
            onChange={this.onChange}
            name="username"
          />
          <span className="login-error" />

          <label>رمز عبور</label>
          <input
            type="password"
            placeholder="رمز عبور را وارد نمایید"
            value={this.state.password}
            onChange={this.onChange}
            name="password"
          />
          <a href="#">رمز عبور خود را فراموش کرده اید ؟</a>
          <span className="login-error" />

          <button type="submit">ورود </button>
        </form>
        <div>
          کاربر جدید هستید ؟<Link to={`/user/sign-up`}>ثبت نام کنید </Link>
          <p><Link to={'/all'}>صفحه اصلی</Link></p>
        </div>
        {redirectState && <Redirect to={'/all'} />}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: () => {
      dispatch({ type: "INIT_LOGIN_USER" });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
