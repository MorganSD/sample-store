import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Home from "./components/home";
import Detail from "./components/detail";
import "./style/responsive.css";
import Footer from "./components/footer";
import SignUp from "./components/signUp";
import Login from "./components/login";
import axios from "./axios";
import { connect } from "react-redux";
import UserInfo from "./components/userInfo";
import SearchResult from "./components/searchResult";
import {
  init_card,
  guest,
  init_login_user,
  init_fav,
  all_list
} from "./actions/actions";
import { existing_address } from "./actions/costumerInfo";
import { reset_errors } from "./actions/post";
import SubmitForm from "./components/SubmitForm";
import Order from "./components/submitOrder";
import OrderResult from "./components/orders/orderResult";
import OrderResultFail from "./components/orders/orderResultFail";
import ProgressBar from "./components/details/progressBar";
import PopUp from "./components/details/popup";
import OrderPage from "./components/orders/order";
import Main from "./main";
import ErrorDisplay from "./components/error500";
class App extends Component {
  constructor() {
    super();
    this.state = {
      userLogedIn: null
    };
  }

  componentWillMount() {
    this.props.init_list();
    this.props.setCard();
    this.props.setFavourite();
    if (!localStorage.getItem("jwtToken")) {
      this.props.setGuestUser();
      this.props.init_address();
      this.setState({
        userLogedIn: true
      });
    } else {
      let user = JSON.parse(localStorage.getItem("jwtToken"));
      this.props.init_address();
      if (user.guest) {
        this.setState({
          userLogedIn: true
        });
      } else {
        this.props.setUser();
        this.setState({
          userLogedIn: true
        });
      }
    }
  }
  componentWillUpdate(nextProps) {
    if (nextProps.currentUser != this.props.currentUser) {
      console.log("user changed", nextProps.currentUser);
    }
  }

  render() {
    if (this.state.userLogedIn) {
      return (
        <React.Fragment>
          {this.props.isLoading ? <ProgressBar /> : null}
          {/* <ProgressBar /> */}
          {this.props.error ? (
            <PopUp
              massage={this.props.errorMassage}
              close={this.props.reset_errors}
            />
          ) : null}
          <Router basename={process.env.PUBLIC_URL}>
            <Route exact path={['/' , "/:id"]} component={Home} />

            {/* <Route exact path='/' component={Main} /> */}
            {/* <Route path='/order/order' component={} /> */}
            <Route path='/serverError' component={ErrorDisplay}/>
            <Route path="/user/login" component={Login} />
            <Route path="/item/:address" component={Detail} />
            <Route path="/user/sign-up" component={SignUp} />
            <Route path="/user/Info" component={UserInfo} />
            <Route path="/search/:search" component={SearchResult} />
            <Route path="/order/submit" component={OrderPage} />
            <Route path="/submit/order/success" component={OrderResult} />
            <Route path="/submit/order/fail" component={OrderResultFail} />

            <Footer />
          </Router>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.InitUserReducer.currentUser,
    userToken: state.InitUserReducer.userToken,
    product_list: state.InitUserReducer.product_list,
    // post_req : state.PostReducer.post_req
    isLoading: state.PostReducer.post_req,
    error: state.PostReducer.post_fail,
    errorMassage: state.PostReducer.post_error
  };
};

const mapDispatchToProps = {
  setCard: init_card,
  setGuestUser: guest,
  setUser: init_login_user,
  setFavourite: init_fav,
  init_list: all_list,
  init_address: existing_address,
  reset_errors: reset_errors
  // return {
  //   setGuestUser : () => {dispatch({type: 'INIT_GUEST'})},
  //   setUser : () => {dispatch({type : 'INIT_LOGIN_USER'})},
  //   setCard : () => {dispatch ({type : 'INIT_CARD'})}
  // }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
