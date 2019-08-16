import React, { Component } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from '../axios';
import { Redirect } from "react-router";
import {logout} from '../actions/actions';

class LogOut extends Component{
   constructor(){
       super();
       this.state = {
        redirectState : false

       }
   }
    logingOut=()=>{
      this.props.logoutUser();
      this.setState({
        redirectState : true
      })
       
    }   
render(){
  const style1 ={
    color : 'grey',
    lineHeight: '50px'

  }
    const { redirectState } = this.state;

    return (
        <React.Fragment>
        <p onClick={this.logingOut} style={style1}>خروج از حساب</p>
        {redirectState && <Redirect to={'/'} />}
        </React.Fragment>
    )
}
}

  
  const mapDispatchToProps = {
    logoutUser : logout 
  };
export default connect( null , mapDispatchToProps)(LogOut);
// export default LogOut;
