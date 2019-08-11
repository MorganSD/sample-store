import React, { Component } from "react";
import { connect } from "react-redux";
import axios from '../../axios';
import { init_card } from "../../actions/actions";

class ContactInfo extends Component {
  constructor() {
    super();
    this.state = {
      info: {
        first_name: "",
        email: "",
        phone_number: ""
      }
    };
  }
  submitInfo = e => {
    e.preventDefault();
    axios.patch('/v2/orders/cart/update/',this.state.info).then( res => {
        if(res.status < 400){
            this.props.init_card();
            this.setContact();
            // this.props.handlePayment();
        }else{
            alert('خطایی رخ داده است ! دویاره تلاش کنید')
        }
    }).catch(error => console.log(error , 'contactInfo patch error'))

  };
  setContact = () =>{
    this.props.contact();
  }
  changeInput = event => {
    this.setState({
      info: {
        ...this.state.info,
        [event.target.name]: event.target.value
      }
    });
  };
  render() {
    console.log("contact", this.state.info);
    return (
      <form
        id="contact-info"
        onSubmit={e => {
          this.submitInfo(e);
        }}
      >
        <h2>اطلاعات تماس</h2>
        <a href="#">ورود یه حساب کاربری</a>

        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          onChange={e => {
            this.changeInput(e);
          }}
          value={this.state.info.first_name}
          name="first_name"
          required
        />

        <input
          type="email"
          placeholder="ایمیل"
          onChange={e => {
            this.changeInput(e);
          }}
          value={this.state.info.email}
          name="email"
          required
        />

        <input
          type="phone"
          placeholder=" تلفن همراه"
          onChange={e => {
            this.changeInput(e);
          }}
          value={this.state.info.phone_number}
          name="phone_number"
          required
        />
        {/* <input type="checkbox" id="news" className="check"  />
        <label for="news">
          علاقه دارم از اخبار تخفیف ها و پیشنهادات ویژه با خبر شوم
        </label> */}
        <button type="submit" className="submit-btn">
          ثبت
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = {
    init_card: init_card
  };
  export default connect(
    null,
    mapDispatchToProps
  )(ContactInfo);
  