import React, { Component } from "react";
import SubmitForm from "../SubmitForm";
import ExitingAdd from "../orders/exitingAdd";
import { connect } from "react-redux";
import CostumerInfo from "../orders/costumerInfo";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {post_req , post_load_success, post_load_failed} from '../../actions/post';



import { init_card } from "../../actions/actions";
import axios from "../../axios";
import Shipping from "../orders/shipping";
import Payment from "../orders/payment";
import ContactInfo from "../orders/contactInfo";
import PostBoxInfo from "../orders/postBoxInfo";
import PostInfo from './postInfo';
import ShippingBoxInfo from './shippingBox'
class AsGuest extends Component {
  constructor() {
    super();
    this.state = {
      redirectSuccessState: false,
      redirectFailState: false,
      contact: true,
      postInfo: false,
      shipping: false,
      payment: false,
      payment_url: ""
    };
  }
  submitSelectedAddress = () => {
    this.props.post_req();
    if (this.props.selected_address != null) {
      axios
        .patch(`/v2/orders/cart/update/`, {
          delivering_address: this.props.selected_address
        })
        .then(res => {
          this.props.post_load_success()
          if (res.status < 400) {
            this.props.init_card();
            this.setState({
              postInfo: false,
              shipping: true,
              payment: false,
              contact : false
            });
          }
        })
        .catch(error => this.props.post_load_failed(error.responsive.data.errors));

    } else {
      alert("آدرسی انتخاب نشده است");
    }
  };
 

  patchShippingMethod = (method) => {
    this.props.post_req()
    axios
    .patch(`/v2/orders/cart/update/`, {
      shipping_method: method,
    })
    .then(res => {
      if (res.status < 400) {
        this.props.post_load_success()
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
    .catch(error => this.props.post_load_failed(error.responsive.data.errors));

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
      // console.log(this.state.shipping)
      this.setState({
        contact : false,
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
  isPostInfo = () =>{
    this.setState({
      contact : false,
        postInfo: true,
        shipping: false,
        payment: false
      });
  }
  submitFinalOrder = () => {
    
      this.props.post_req();
    axios
      .post("/v2/orders/order/create/", {
        payment_method: this.props.selected_payment,
        products: this.props.cart.product_list
      })
      .then(res => {
        if (res.status < 400) {
            this.props.post_load_success()
          this.setState({
            postInfo: false,
            shipping: false,
            payment: false,
          })
          // console.log("create order successfull", res.data.data);
          if (res.data.data.order.payment_method_data.gateway != null) {
           window.location.href = res.data.data.order.payment_method_data.payment_url 
           this.props.init_card();
          } else {
        this.props.init_card();
        this.setState({
            redirectSuccessState: true
          });
          }
        } 
      })
      .catch(error => {
        if(error.response.data.status === 500){
        return ( <Redirect to={"/serverError"} />  )     
        }else{
          this.props.post_load_failed(error.response.data.errors)
        }
      });
  };
  render() {
    const { redirectFailState , redirectSuccessState } = this.state;

    return (
    
        <div className="right_side">
      
{this.state.contact ? (
  this.props.cart.email != null ? (
    <>
    <CostumerInfo />
     {    this.props.exiting_address ? (
                // check if there is address use it if not add one
                this.props.exiting_address.length > 0 ? (
                  <>
                    <ExitingAdd
                      address={this.props.exiting_address}
                      phone={this.props.cart.phone_number}
                      nextState = {()=>{this.isShipping()}}
                    />
                    <button
                      onClick={this.submitSelectedAddress}
                      className="submit-btn"
                    >
                      ادامه
                    </button>
                  </>
                ) : (
                    <PostInfo changeAddState={()=>{this.isShipping()}} phone_number={this.props.cart.phone_number}/>

                )
              ) : null}
   </>
  ): 
    (<SubmitForm changeState={()=>{this.isShipping()}} />)
):null
}

          {
          // if cart is deliverable , there is 3 steps to submit order: 1- submit address 2- submit shipping method 3- submit payment method
          this.props.cart.deliverable ? (
            // step one
            this.state.postInfo ? (
            <>
            <CostumerInfo />
            {  this.props.exiting_address ? (
                // check if there is address use it if not add one
                this.props.exiting_address.length > 0 ? (
                  <>
                    <ExitingAdd
                      address={this.props.exiting_address}
                      phone={this.props.cart.phone_number}
                      nextState = {()=>{this.isShipping()}}

                    />
                    <button
                      onClick={this.submitSelectedAddress}
                      className="submit-btn"
                    >
                      ادامه
                    </button>
                  </>
                ) : (
                    <PostInfo changeAddState={()=>{this.isShipping()}} phone_number={this.props.cart.phone_number}/>

                )
              ) : null}
            </>
            ) : // step2
            this.state.shipping ? (
              <>
               <CostumerInfo />
              <PostBoxInfo changeState={()=>{this.isPostInfo()}}/>
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
               <CostumerInfo />
              <PostBoxInfo changeState={()=>{this.isPostInfo()}}/>
                <ShippingBoxInfo changeState={()=>{this.isShipping()}} />
                <Payment />
                <button onClick={this.submitFinalOrder} className="submit-btn">
                  پرداخت
                </button>
              </>
            ) : null
          ) : (
            // if cart is not deliverable there is just one step : 1- submit payment method
            <>
             <CostumerInfo />
              <Payment />
              <button onClick={this.submitFinalOrder} className="submit-btn">
                پرداخت
              </button>
            </>
          )}
         
          {redirectFailState && <Redirect to={"/submit/order/fail"} />}
          {redirectSuccessState && <Redirect to={"/submit/order/success"} />}
          <Link to={'/'}  className='return_to_home'>برگشت به صفحه محصول</Link>
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
  init_card: init_card,
  post_req : post_req,
  post_load_failed : post_load_failed,
  post_load_success : post_load_success
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsGuest);
