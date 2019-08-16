import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import App from './App';
import OrderPage from "./components/orders/order";
import SubmitForm from "./components/SubmitForm";
import Order from "./components/submitOrder";
import OrderResult from "./components/orders/orderResult";
import OrderResultFail from "./components/orders/orderResultFail";
import UserInfo from "./components/userInfo";
import SearchResult from "./components/searchResult";
import SignUp from "./components/signUp";
import Login from "./components/login";
import axios from "./axios";
import Header from "./components/header";
import Home from "./components/home";
import Detail from "./components/detail";

class Main extends Component{
    

    render() {
        // console.log("token g", this.props.userToken);
        // console.log(JSON.parse(localStorage.getItem("card")));
        console.log("consoool", this.props.isLoading);
    
          return (
            <React.Fragment>
            <Router>
              <Header />
                <Route exact path="/" component={Home} />
                <Route path="/user/login" component={Login} />
                <Route path="/item/:address" component={Detail} />
                <Route path="/user/sign-up" component={SignUp} />
                <Route path="/user/Info" component={UserInfo} />
                <Route path="/search/:search" component={SearchResult} />
             </Router>
            </React.Fragment>
          );
        
      }
}
export default Main