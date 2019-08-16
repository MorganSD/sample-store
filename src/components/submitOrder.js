import React, { Component } from "react";
import "../style/submitOrder.css";
import "../style/formOrder.css";
import { connect } from "react-redux";

import AsGuest from "./orders/asGuest";
import AsLogin from './orders/asLogin'
class Order extends Component {

  render() {
    return (
      <div id="order">
        {this.props.userLogedIn ?(
          <AsLogin />
        ): <AsGuest />
        }
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userLogedIn: state.InitUserReducer.userLogedIn,
  };
};
export default connect(
  mapStateToProps
)(Order);
