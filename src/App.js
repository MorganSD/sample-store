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
class App extends Component {
  constructor(){
    super();
    this.state = {
      userLogedIn : null
    }
  }
  
  componentWillMount(){
    if(!localStorage.getItem('jwtToken')){
      this.props.setGuestUser();
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
  componentWillUpdate(nextProps){
    if(nextProps.currentUser != this.props.currentUser){
      console.log('user changed',nextProps.currentUser)
    }
  }
    
  
  render () {
    // console.log('redux state',this.props.currentUser)
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
  return {currentUser : state.currentUser}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGuestUser : () => {dispatch({type: 'INIT_GUEST'})},
    setUser : () => {dispatch({type : 'INIT_LOGIN_USER'})}
  }
}
export default connect(mapStateToProps , mapDispatchToProps)(App);
