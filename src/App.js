import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './components/home';
import Detail from './components/detail';
import './style/responsive.css';
import Footer from './components/footer';
import SignUp from './components/signUp';
import Login from './components/login';
import axios from './axios';
import {connect} from 'react-redux';
import UserInfo from './components/userInfo';
import SearchResult from './components/searchResult';
import {init_card ,guest ,init_login_user,init_fav,all_list} from './actions/actions';
import Order from './components/submitOrder';

class App extends Component {
  constructor(){
    super();
    this.state = {
      userLogedIn : null
    }
  }
  
  componentWillMount(){
    this.props.init_list();
    this.props.setCard();
    this.props.setFavourite();
    if(!localStorage.getItem('jwtToken')){
      this.props.setGuestUser();
            this.setState({
        userLogedIn : true
      })
    }else{
    let user = JSON.parse(localStorage.getItem('jwtToken'))
    if(user.guest){
      this.setState({
        userLogedIn : true
      })
    }else{
      this.props.setUser();
      this.setState({
        userLogedIn : true
      })
    }
      
     
    }
  }
  componentWillUpdate(nextProps){
    if(nextProps.currentUser != this.props.currentUser){
      console.log('user changed',nextProps.currentUser)
    }
  }
    
  
  render () {
    console.log('token g',this.props.userToken)
    console.log(JSON.parse(localStorage.getItem('card')))

    if(this.state.userLogedIn){
    return(
    <React.Fragment>
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Route exact path="/:category" component={Home} />
        <Route path="/user/login" component={Login} />
        <Route path="/item/:address" component={Detail} />
        <Route path="/user/sign-up" component={SignUp} />
        <Route path="/user/Info" component={UserInfo} />
        <Route path='/search/:search' component={SearchResult} />
        <Route path='/order/submit' component={Order} />
        <Footer />
      </Router>
    </React.Fragment>
  )
  }else{
    return null
  }
}

}
const mapStateToProps = (state) =>{
  return {currentUser : state.InitUserReducer.currentUser,
  userToken : state.InitUserReducer.userToken}
}

const mapDispatchToProps = {

  setCard : init_card,
  setGuestUser : guest,
  setUser : init_login_user,
  setFavourite : init_fav,
  init_list : all_list
  // return {
  //   setGuestUser : () => {dispatch({type: 'INIT_GUEST'})},
  //   setUser : () => {dispatch({type : 'INIT_LOGIN_USER'})},
  //   setCard : () => {dispatch ({type : 'INIT_CARD'})}
  // }
}
export default connect(mapStateToProps , mapDispatchToProps)(App);
