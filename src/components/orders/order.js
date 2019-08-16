import React, { Component } from "react";
import SubmitOrder from "../submitOrder";
import OrderCard from "./card";
import '../../style/mainOrder.css';

class OrderPage extends Component {
  render() {
    return (
      <div id='main_order_page'>
        <SubmitOrder />
        <OrderCard />
      </div>
    );
  }
}
export default OrderPage;
