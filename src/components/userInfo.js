import React, { Component } from 'react';
import '../style/userInfo.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {connect} from 'react-redux';
import LogOut from './logOut';
import Header from "../components/header";

class UserInfo extends Component {

render(){
    const user = JSON.parse(localStorage.getItem('jwtToken'))
    // const user = this.props.currentUser
    return(
<>
<Header/>
        <div className="userInfo">
            <h3>خوش آمدید {user.user.first_name + user.user.last_name}</h3>
            <div>
                <h3>نام کاربری</h3>
                <p>{user.user.username}</p>
                <h3>ایمیل</h3>
                <p>{user.user.email}</p>
                <h3>شماره همراه</h3>
                <p>{user.user.phone_number}</p>
                {/* <p>{user.user.password}</p> */}
               
            </div>
            <Link to={'/'}>برگشت به صفحه اصلی</Link>
        </div>
        </>
    )
}
}
const mapStateToProps = state => {
    return {
      currentUser: state.InitUserReducer.currentUser.user,
      
    };
  };
export default connect(
    mapStateToProps
  )(UserInfo);