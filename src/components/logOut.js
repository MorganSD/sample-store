import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "../axios";
import { Redirect } from "react-router";
import { logout } from "../actions/actions";
import userPro from '../Icon Simplestore/user.png'
class LogOut extends Component {
  constructor() {
    super();
    this.state = {
      panel: false,
      redirectState: false
    };
  }
  logingOut = () => {
    this.props.logoutUser();
    this.setState({
      panel : false,
      redirectState: true
    });
  };
  showPanel = () =>{
    this.setState({
      panel : !this.state.panel
    })
  }
  render() {
    const style1 = {
      color: "grey",
      lineHeight: "50px",
      cursor: "pointer"
    };
    const { redirectState } = this.state;
    const user = JSON.parse(localStorage.getItem("jwtToken"));

    return (
      <React.Fragment>
        <img src={userPro} onClick={()=>{this.showPanel()}} />
        {this.state.panel ? (
          <ul className='userPanel'>
            <li onClick={()=>{{this.setState({panel : false})}}}>
              <Link to="/user/Info"> سلام {user.user.first_name}</Link>
            </li>
            <li
              onClick={() => {
                this.logingOut();
              }}
            >
              خروج از حساب
            </li>
          </ul>
        ) : null}

        {redirectState && <Redirect to={"/"} />}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.InitUserReducer.currentUser.user
  };
};

const mapDispatchToProps = {
  logoutUser: logout
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOut);
// export default LogOut;
