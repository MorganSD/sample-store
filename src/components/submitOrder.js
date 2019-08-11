import React, { Component } from "react";
import "../style/submitOrder.css";
import OrderCard from "./orders/card";
import SubmitForm from "./SubmitForm";
import ExitingAdd from "./orders/exitingAdd";
import "../style/formOrder.css";
import { connect } from "react-redux";
import CostumerInfo from "./orders/costumerInfo";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";



import { init_card } from "../actions/actions";
import axios from "../axios";
import Shipping from "./orders/shipping";
import Payment from "./orders/payment";
import ContactInfo from "./orders/contactInfo";
class Order extends Component {
  constructor() {
    super();
    this.state = {
      redirectSuccessState: false,
      redirectFailState: false,
      contact: false,
      postInfo: true,
      shipping: false,
      payment: false,
      payment_url: ""
    };
  }
  submitSelectedAddress = () => {
    if (this.props.selected_address != null) {
      axios
        .patch(`/v2/orders/cart/update/`, {
          delivering_address: this.props.selected_address
        })
        .then(res => {
          if (res.status < 400) {
            this.props.init_card();
            this.setState({
              postInfo: false,
              shipping: true,
              payment: false
            });
          }
        })
        .catch(error => {
          console.log("error patch", error);
          alert("خطایی رخ داده است ! دوباره تلاش کنید");
        });
    } else {
      alert("آدرسی انتخاب نشده است");
    }
  };
 

  patchShippingMethod = (method) => {
    axios
    .patch(`/v2/orders/cart/update/`, {
      shipping_method: method,
    })
    .then(res => {
      if (res.status < 400) {
        if(this.props.selected_shipping_date != null){
          axios.patch('/v2/orders/cart/update/' , {
            shipping_interval: this.props.selected_shipping_date.hour
          }).catch(error => console.log(error , 'patch hour error'))
        }
        this.props.init_card();
        this.setState({
          postInfo: false,
          shipping: false,
          payment: true
        });
      }
    })
    .catch(error => {
      console.log("error patch", error);
      alert("خطایی رخ داده است ! دوباره تلاش کنید");
    });
  }

  submitSelectedShipping = () => {
    if (this.props.selected_shipping != null) {
     this.patchShippingMethod(this.props.selected_shipping )
     
    } else {
      alert(" روش ارسال را انتخاب کنید ");
    }
  };
  isPayment = () => {
    this.setState({
      postInfo: false,
      shipping: false,
      payment: true
    });
  };
  isShipping = () => {
    this.setState({
      postInfo: false,
      shipping: true,
      payment: false
    });
  };
  isContact = () => {
    this.setState({
      contact: true
    });
  };
  submitFinalOrder = () => {
    axios
      .post("/v2/orders/order/create/", {
        payment_method: this.props.selected_payment,
        products: this.props.cart.product_list
      })
      .then(res => {
        if (res.status < 400) {
          console.log("create order successfull", res.data.data);
          if (res.data.data.order.payment_method_data.gateway != null) {
           window.location.href = res.data.data.order.payment_method_data.payment_url 
           this.props.init_card();

            // window.location.assign(`${res.payment_method_data.payment_url}`);
          } else {
            if(res.data.data.order.is_paid)
            {
              this.props.init_card();
              this.setState({
              redirectSuccessState: true
            });
          }else{
            this.setState({
              redirectFailState: true
            });
          }
          }
        } else {
          alert("خطایی رخ داده است ! دوباره تلاش کنید");
        }
      })
      .catch(error => {
        console.log("error patch", error);
        alert("خطایی رخ داده است ! دوباره تلاش کنید");
      });
  };
  render() {
    const { redirectFailState , redirectSuccessState } = this.state;

    return (
      <div id="order">
        {/* <OrderCard /> */}
        <div className="right_side">
          {/* <div className='order_breadCrumb'>
            <span>
              <span>سبد خرید</span>
              <img />
            </span>
          </div> */}
          {this.props.userLogedIn ? (
            <CostumerInfo />
          ) : this.props.cart.email !== null ? (
            <CostumerInfo />
          ) : (
            null
          )}

          {// this.props.userLogedIn ? (
          // if cart is deliverable , there is 3 steps to submit order: 1- submit address 2- submit shipping method 3- submit payment method
          this.props.cart.deliverable ? (
            // step one
            this.state.postInfo ? (
              this.props.exiting_address ? (
                // check if there is address use it if not add one
                this.props.exiting_address.length > 0 ? (
                  <>
                    <ExitingAdd
                      address={this.props.exiting_address}
                      phone={this.props.cart.phone_number}
                    />
                    <button
                      onClick={this.submitSelectedAddress}
                      className="submit-btn"
                    >
                      ادامه
                    </button>
                  </>
                ) : (
                  <SubmitForm shipping={this.isShipping} />
                )
              ) : null
            ) : // step2
            this.state.shipping ? (
              <>
                <Shipping />
                <button
                  onClick={this.submitSelectedShipping}
                  className="submit-btn"
                >
                  ادامه
                </button>
              </>
            ) : // step3
            this.state.payment ? (
              <>
                <Payment />
                <button onClick={this.submitFinalOrder} className="submit-btn">
                  پرداخت
                </button>
              </>
            ) : null
          ) : (
            // if cart is not deliverable there is just one step : 1- submit payment method
            <>
              <Payment />
              <button onClick={this.submitFinalOrder} className="submit-btn">
                پرداخت
              </button>
            </>
          )}
          {/* ) : this.props.cart.deliverable ? (
           if cart is deliverable for guest : submit reciver info and address
            this.state.postInfo ? (
               <SubmitForm shipping={this.isShipping}/>
            ) : this.state.shipping ? (
              <>
                <Shipping />
                <button
                  onClick={this.submitSelectedShipping}
                  className="submit-btn"
                >
                  ادامه
                </button>
              </>
            ) : this.state.payment ? (
              <>
                <Payment />
                <button onClick={this.submitFinalOrder} className="submit-btn">
                  پرداخت
                </button>
              </>
            ) : null
          ) : this.state.postInfo ? (
            <ContactInfo handlePayment={this.isPayment} />
          ) : this.state.payment ? (
            <>
              <Payment />
              <button onClick={this.submitFinalOrder} className="submit-btn">
                پرداخت
              </button>
            </>
          ) : null} */}
          {redirectFailState && <Redirect to={"/submit/order/fail"} />}
          {redirectSuccessState && <Redirect to={"/submit/order/success"} />}
          <Link to={'/all'}  className='return_to_home'>برگشت به صفحه محصول</Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    exiting_address: state.InitUserReducer.currentUser.address,
    userLogedIn: state.InitUserReducer.userLogedIn,
    selected_address: state.InitUserReducer.currentUser.selected_ad,
    selected_shipping: state.InitUserReducer.currentUser.selected_shipping,
    selected_payment: state.InitUserReducer.currentUser.selected_payment,
    selected_shipping_date:
      state.InitUserReducer.currentUser.selected_shipping_date,
    cart: state.InitUserReducer.card.cart
  };
};
const mapDispatchToProps = {
  init_card: init_card
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
