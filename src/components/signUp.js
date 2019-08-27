import React, { Component } from "react";
import "../style/signup.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../axios";
import { loginUser } from "../actions/actions";
import { Redirect } from "react-router";
import Header from "./header";


class SignUp extends Component {
  constructor() {
    super();
    this.state = {
    //   name: "",
    //   email: "",
    //   phone: "",
    //   password: "",
    //   re_password: "",
     signUpInfo :{},
     re_password : '',
      errors: [],
      redirectState : false
    };
  }

  handleChange = event => {
    this.setState({
        signUpInfo : {
            ...this.state.signUpInfo,
            [event.target.name]: event.target.value

        }
    });
  };
  handlePassChange = (e) =>{
      this.setState({
          re_password : e.target.value
      })
  }
  isFormValid = () => {
    if (
      this.state.name === "" &&
      this.state.email === "" &&
      this.state.phone === "" &&
      this.state.password === "" &&
      this.state.re_password === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  signUpForm = e => {
    e.preventDefault();
    if (this.state.signUpInfo.password === this.state.re_password) {
      axios
        .post("/profiles/profile/", this.state.signUpInfo)
        .then(res => {
          const token = res.data.data.token;
          // console.log("token", token);
          localStorage.setItem("jwtToken", JSON.stringify(res.data.data));
          this.props.loginUser(this.state.signUpInfo.email , this.state.signUpInfo.password);
          this.setState({
            signUpInfo :{},
            // errors: [],
            redirectState : true
          })

          // <Redirect path="*" to="/" />
        }).catch(error =>
          this.setState({
            errors: error.response.data.errors.form_errors
          })
        );
    } else {
      this.setState({
        errors: {
            ...this.state.errors,
          re_password: "تکرار رمز عبور اشتباه است "
        }
      });
    }
  };
  render() {
    // console.log(this.state);
    const isFormValid = this.isFormValid();
    const { redirectState } = this.state;

    return (
      <React.Fragment>
        <Header/>
        <p className="signInForm">ثبت نام در فروشگاه</p>
        <form
          className="signUpForm"
          onSubmit={e => {
            this.signUpForm(e);
          }}
        >
          <label>نام و نام خانودگی</label>
          <input
            name="first_name"
            type="text"
            onChange={(e)=>{this.handleChange(e)}}
            value={this.state.signUpInfo.first_name}
          />
          {this.state.errors.first_name ? (
            <span className="form_errors">
              {this.state.errors.first_name.map(e => (
                <p>{e}</p>
              ))}
            </span>
          ) : null}
          <label>ایمیل</label>
          <input
            name="email"
            type="email"
            onChange={(e)=>{this.handleChange(e)}}
            value={this.state.signUpInfo.email}
          />
          {this.state.errors.email ? (
            <span className="form_errors">
              {this.state.errors.email.map(e => (
                <p>{e}</p>
              ))}
            </span>
          ) : null}

          <label>شماره همراه</label>
          <input
            name="phone_number"
            type="phone"
            onChange={(e)=>{this.handleChange(e)}}
            value={this.state.signUpInfo.phone_number}
          />
          {this.state.errors.phone_number ? (
            <span className="form_errors">
              {this.state.errors.phone_number.map(e => (
                <p>{e}</p>
              ))}
            </span>
          ) : null}

          <label>رمز عبور</label>
          <input
            name="password"
            type="password"
            onChange={(e)=>{this.handleChange(e)}}
            value={this.state.signUpInfo.password}
          />
          {this.state.errors.password ? (
            <span className="form_errors">
              {this.state.errors.password.map(e => (
                <p>{e}</p>
              ))}
            </span>
          ) : null}
          <label>تکرار رمز عبور</label>
          <input
            name="re_password"
            type="password"
            onChange={(e)=>{this.handlePassChange(e)}}
            value={this.state.re_password}
          />
          {this.state.errors.re_password ? (
            <span className="form_errors">
              
                <p>{this.state.errors.re_password}</p>
            
            </span>
          ) : null}
          <button disabled={!isFormValid} type="submit">
            ثبت نام
          </button>
        </form>
        <div className="linkForm">
          حساب کاربری دارید ؟<Link to={"/user/login"}> وارد شوید</Link>
          <p>
            <Link to={"/"}>صفحه اصلی</Link>
          </p>
          {redirectState && <Redirect to={'/'} />}

        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  loginUser: loginUser
};
export default connect(
  null,
  mapDispatchToProps
)(SignUp);
